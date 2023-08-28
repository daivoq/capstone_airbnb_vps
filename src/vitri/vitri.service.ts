import { Injectable } from '@nestjs/common';
import { VitriDto } from './dto/vitri.dto';
import { PrismaClient } from '@prisma/client';
import { TokenService } from 'src/jwt/token.service';
import { uploadService } from 'src/upload/upload.service';

@Injectable()
export class VitriService {
  constructor(private readonly tokenService: TokenService) {}
  prisma = new PrismaClient();

  async getAll(token: string) {
    // const isTokenValid = this.tokenService.validateToken(token);

    // if (isTokenValid) {
    try {
      let data = await this.prisma.vitri.findMany();
      return data;
    } catch {
      return 'Lỗi';
    }
    // } else {
    //   return 'Token không đúng hoặc hết hạn';
    // }
  }

  async getById(id: number, token: string) {
    // const isTokenValid = this.tokenService.validateToken(token);

    // if (isTokenValid) {
    try {
      let data = await this.prisma.vitri.findFirst({
        where: {
          ma_vi_tri: id,
        },
      });
      if (data) {
        return data;
      }
      {
        return 'Không tồn tại';
      }
    } catch {
      return 'Lỗi';
    }
    // } else {
    //   return 'Token không đúng hoặc hết hạn';
    // }
  }

  async getPhanTrang(page: number, perPage: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let offset = (page - 1) * perPage;
        let data = await this.prisma.vitri.findMany({
          skip: offset,
          take: perPage,
        });
        return data;
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async createViTri(vitriDto: VitriDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          await this.prisma.vitri.create({
            data: vitriDto,
          });
          return 'Thêm vị tri thành công';
        } catch {
          return 'Lỗi';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async uploadImg(file: Express.Multer.File, id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);
    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền';
      } else {
        try {
          const vitri = 'vitri';
          const idString = id.toString();
          const hinh_anh = await uploadService(file, vitri, idString);

          // Lưu tên hình vào cơ sở dữ liệu
          await this.prisma.vitri.update({
            where: {
              ma_vi_tri: id,
            },
            data: {
              hinh_anh: hinh_anh,
            },
          });

          return 'Tải lên thành công';
        } catch (error) {
          return 'Tải lên thất bại';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async update(id: number, vitriDto: VitriDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          await this.prisma.vitri.update({
            where: {
              ma_vi_tri: id,
            },
            data: vitriDto,
          });
          return 'Update thành công';
        } catch {
          return 'Lỗi';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async delete(id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          // xóa phong có khóa phụ là ma_vi_tri
          await this.prisma.phong.deleteMany({
            where: {
              ma_vi_tri: id,
            },
          });
          // xóa vitri
          await this.prisma.vitri.delete({
            where: {
              ma_vi_tri: id,
            },
          });
          return 'Delete thành công';
        } catch {
          return 'Lỗi';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }
}
