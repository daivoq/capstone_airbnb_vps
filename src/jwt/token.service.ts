import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CreateTokenDto } from './dto/createtoken.dto';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  private get secretKey(): string {
    return this.configService.get('SECRETKEY');
  }

  createToken(data: CreateTokenDto): string {
    try {
      const token = jwt.sign({ data }, this.secretKey, { expiresIn: '1h' });
      return token;
    } catch (error) {
      return error;
    }
  }

  validateToken(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(
    token: string,
  ): { data: { ma_nguoi_dung: number; role: string } } | null {
    try {
      const decoded = jwt.verify(token, this.secretKey) as {
        data: { ma_nguoi_dung: number; role: string };
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
