import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanDto } from './dto/binhluan.dto';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/jwt/token.service';

@Injectable()
export class BinhluanService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  prisma = new PrismaClient();
  secretKey = this.configService.get('SECRETKEY');

  async getCmtByIdPhong(ma_phong: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.binhluan.findMany({
          where: {
            ma_phong,
          },
        });
        return data;
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async getAllCmt(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.binhluan.findMany();
        return data;
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async createCmt(body: BinhLuanDto, ma_phong: number, token: string) {
    let ngay_binh_luan = new Date();
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);

      try {
        await this.prisma.binhluan.create({
          data: {
            ...body,
            ngay_binh_luan,
            ma_nguoi_dung: decode.data.ma_nguoi_dung,
            ma_phong,
          },
        });
        return 'Thêm bình luận thành công';
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async updateCmt(body: BinhLuanDto, id_binh_luan: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        await this.prisma.binhluan.update({
          where: {
            id: id_binh_luan,
          },
          data: body,
        });
        return 'Thay đổi thành công';
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async deleteCmt(id_binh_luan: number, token) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        await this.prisma.binhluan.delete({
          where: {
            id: id_binh_luan,
          },
        });
        return 'Xóa bình luận thành công';
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }
}
