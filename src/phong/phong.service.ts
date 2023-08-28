import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PhongDto } from './dto/phong.dto';
import { TokenService } from 'src/jwt/token.service';
import { uploadService } from 'src/upload/upload.service';

@Injectable()
export class PhongService {
  constructor(private readonly tokenService: TokenService) {}

  prisma = new PrismaClient();

  async getAll(token: string) {
    // const isTokenValid = this.tokenService.validateToken(token);

    // if (isTokenValid) {
    // try {
    let data = await this.prisma.phong.findMany({
      include: {
        vitri: true,
      },
    });
    return data;
    // } catch {
    //   return 'Lỗi';
    // }
    // } else {
    //   return 'Token không đúng hoặc hết hạn';
    // }
  }

  async getByViTri(ma_vi_tri: number, token: string) {
    // const isTokenValid = this.tokenService.validateToken(token);

    // if (isTokenValid) {
    try {
      let data = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri,
        },
        include: {
          vitri: true,
        },
      });
      return data;
    } catch {
      return 'Lỗi';
    }
    // } else {
    //   return 'Token không đúng hoặc hết hạn';
    // }
  }

  async getPhanTrang(page: number, perPage: number, token: string) {
    let offset = (page - 1) * perPage;
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.phong.findMany({
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

  async getById(id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.phong.findFirst({
          where: {
            ma_phong: id,
          },
          include: {
            vitri: true,
          },
        });
        if (data) {
          return data;
        } else {
          return 'Không tồn tại';
        }
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async createPhong(phongDto: PhongDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          await this.prisma.phong.create({
            data: phongDto,
          });
          return 'Tạo phòng thành công';
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
          const vitri = 'phong';
          const idString = id.toString();
          const hinh_anh = await uploadService(file, vitri, idString);

          // kiểm tra
          let check = await this.prisma.phong.findFirst({
            where: {
              ma_phong: id,
            },
          });
          if (check) {
            // Lưu tên hình vào cơ sở dữ liệu
            await this.prisma.phong.update({
              where: {
                ma_phong: id,
              },
              data: {
                hinh_anh: hinh_anh,
              },
            });

            return 'Tải lên thành công';
          } else {
            return 'không tồn tại';
          }
        } catch (error) {
          return 'Tải lên thất bại';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async update(phongDto: PhongDto, id: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          await this.prisma.phong.update({
            where: {
              ma_phong: id,
            },
            data: phongDto,
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
          // xóa bình luận
          await this.prisma.binhluan.deleteMany({
            where: {
              ma_phong: id,
            },
          });
          // xóa đặt phòng
          await this.prisma.datphong.deleteMany({
            where: {
              ma_phong: id,
            },
          });
          // xóa phòng
          await this.prisma.phong.delete({
            where: {
              ma_phong: id,
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
