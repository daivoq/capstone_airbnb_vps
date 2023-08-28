import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NguoidungDto } from './dto/nguoidung.dto';
import { SearchDto } from './dto/search.dto';
import { TokenService } from 'src/jwt/token.service';
import { uploadService } from 'src/upload/upload.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NguoidungService {
  constructor(private readonly tokenService: TokenService) {}
  prisma = new PrismaClient();

  async getAllUser(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);

      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        try {
          let data = await this.prisma.nguoidung.findMany();
          return data;
        } catch {
          return 'Lỗi';
        }
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async getUser(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      try {
        let data = await this.prisma.nguoidung.findFirst({
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

  async getSearchUser(searchDto: SearchDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let data = await this.prisma.nguoidung.findMany({
          where: {
            name: {
              contains: searchDto.search,
            },
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

  async getPhanTrang(page: number, perPage: number, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      try {
        let offset = (page - 1) * perPage;
        let data = await this.prisma.nguoidung.findMany({
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

  async uploadAvatar(file: Express.Multer.File, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);
    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      try {
        const vitri = 'avatar';
        const idString = decode.data.ma_nguoi_dung.toString();
        const avatar = await uploadService(file, vitri, idString);
        // lưu tên hình vào cơ sở dữ liệu
        await this.prisma.nguoidung.update({
          where: {
            ma_nguoi_dung: decode.data.ma_nguoi_dung,
          },
          data: {
            avatar: avatar,
          },
        });
        return 'Tải lên thành công';
      } catch (error) {
        return 'Tải lên thất bại';
      }
    } else {
      return 'Token không hợp lệ hoặc hết hạn';
    }
  }

  async update(nguoidungDto: NguoidungDto, token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      try {
        let newPassWord = await bcrypt.hash(nguoidungDto.pass_word, 10);

        await this.prisma.nguoidung.update({
          where: {
            ma_nguoi_dung: decode.data.ma_nguoi_dung,
          },
          data: { ...nguoidungDto, pass_word: newPassWord },
        });
        return 'Update thành công';
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async delete(token: string) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      try {
        await this.prisma.nguoidung.delete({
          where: {
            ma_nguoi_dung: decode.data.ma_nguoi_dung,
          },
        });
        return 'Delete thành công';
      } catch {
        return 'Lỗi';
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }

  async deleteRoleAdmin(token: string, id: number) {
    const isTokenValid = this.tokenService.validateToken(token);

    if (isTokenValid) {
      const decode = this.tokenService.decodeToken(token);
      if (decode.data.role !== 'admin') {
        return 'Bạn không có quyền !!!';
      } else {
        let user = await this.prisma.nguoidung.findFirst({
          where: {
            ma_nguoi_dung: id,
          },
        });

        // *** Xóa các bảng có khóa phụ là ma_nguoi_dung trước
        //  Xóa bảng BinhLuan
        await this.prisma.binhluan.deleteMany({
          where: {
            ma_nguoi_dung: id,
          },
        });

        // Xóa bảng DatPhong
        await this.prisma.datphong.deleteMany({
          where: {
            ma_nguoi_dung: id,
          },
        });

        // *** Xóa Người Dùng
        await this.prisma.nguoidung.delete({
          where: {
            ma_nguoi_dung: id,
          },
        });
        return `Xóa thành công User: ${user.name} có  mã người dùng :${user.ma_nguoi_dung}`;
      }
    } else {
      return 'Token không đúng hoặc hết hạn';
    }
  }
}
