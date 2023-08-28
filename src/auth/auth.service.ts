import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config/dist';
import { TokenService } from 'src/jwt/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  prisma = new PrismaClient();
  secretKey = this.configService.get('SECRETKEY');

  async signUp(body: SignUpDto) {
    let check = await this.prisma.nguoidung.findFirst({
      where: {
        email: body.email,
      },
    });

    try {
      if (check && check.email === body.email) {
        return 'Email đã tồn tại';
      } else {
        let hashedPassword = await bcrypt.hash(body.pass_word, 10);
        await this.prisma.nguoidung.create({
          data: { ...body, pass_word: hashedPassword },
        });
        return 'Đăng ký thành công';
      }
    } catch (error) {
      return 'Lỗi';
    }
  }

  async signIn(body: SignInDto) {
    let check = await this.prisma.nguoidung.findFirst({
      where: {
        email: body.email,
      },
    });

    if (check) {
      let isMatch = await bcrypt.compare(body.pass_word, check.pass_word);

      if (isMatch) {
        let token = this.tokenService.createToken(check);

        return { messgae: 'Đăng nhập thành công', Token: token };
      } else {
        return 'Mật khẩu không đúng';
      }
    } else {
      return 'Email không đúng';
    }
  }
}
