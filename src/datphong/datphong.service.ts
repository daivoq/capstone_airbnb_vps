import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatPhongDto } from './dto/datphong.dto';
import { TokenService } from 'src/jwt/token.service';
import { parseISO } from 'date-fns';

@Injectable()
export class DatphongService {
  constructor(private readonly tokenService: TokenService) {}

  prisma = new PrismaClient();

  async getAll(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.datphong.findMany();
        return data;
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async getById(id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.datphong.findMany({
          where: {
            ma_phong: id,
          },
        });
        return data;
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hế hạn';
    }
  }

  async getByIdUser(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);

      try {
        let data = await this.prisma.datphong.findMany({
          where: {
            ma_nguoi_dung: decode.data.ma_nguoi_dung,
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

  async createDatPhong(datPhongDto: DatPhongDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      try {
        let check = await this.prisma.phong.findFirst({
          where: {
            ma_phong: datPhongDto.ma_phong,
          },
        });

        const ngayDen = parseISO(datPhongDto.ngay_den);
        const ngayDi = parseISO(datPhongDto.ngay_di);

        if (datPhongDto.so_luong_khach > check.khach) {
          return 'Số lượng khách nhiều hơn cho phép';
        } else {
          await this.prisma.datphong.create({
            data: {
              ...datPhongDto,
              ma_nguoi_dung: decode.data.ma_nguoi_dung,
              ngay_den: ngayDen,
              ngay_di: ngayDi,
            },
          });
          return 'Đặt phòng thành công';
        }
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async update(datPhongDto: DatPhongDto, id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let check = await this.prisma.phong.findFirst({
          where: {
            ma_phong: datPhongDto.ma_phong,
          },
        });

        const ngayDen = parseISO(datPhongDto.ngay_den);
        const ngayDi = parseISO(datPhongDto.ngay_di);

        if (datPhongDto.so_luong_khach > check.khach) {
          return 'Số lượng khách nhiều hơn cho phép';
        } else {
          await this.prisma.datphong.update({
            where: {
              id,
            },
            data: { ...datPhongDto, ngay_den: ngayDen, ngay_di: ngayDi },
          });
          return 'Update thành công';
        }
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async delete(id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        await this.prisma.datphong.delete({
          where: {
            id,
          },
        });
        return 'Xóa thành công';
      } catch {
        return ' Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }
}
