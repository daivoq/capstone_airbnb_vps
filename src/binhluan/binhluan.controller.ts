import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { BinhLuanDto } from './dto/binhluan.dto';
import { AccessToken } from 'src/jwt/jwt.accestoken';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Binh luan')
@ApiBearerAuth()
@Controller('binhluan')
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) {}

  @Get(':ma_phong')
  getCmtByIdPhong(
    @Param('ma_phong') ma_phong: string,
    @AccessToken() token: string,
  ) {
    return this.binhluanService.getCmtByIdPhong(+ma_phong, token);
  }

  @Get()
  getAllCmt(@AccessToken() token: string) {
    return this.binhluanService.getAllCmt(token);
  }

  @Post(':ma_phong')
  createCmt(
    @Body() body: BinhLuanDto,
    @Param('ma_phong') ma_phong: string,
    @AccessToken() token: string,
  ) {
    return this.binhluanService.createCmt(body, +ma_phong, token);
  }

  @Put(':id_binh_luan')
  updateCmt(
    @Body() body: BinhLuanDto,
    @Param('id_binh_luan') id_binh_luan: string,
    @AccessToken() token: string,
  ) {
    return this.binhluanService.updateCmt(body, +id_binh_luan, token);
  }

  @Delete(':id_binh_luan')
  deleteCmts(
    @Param('id_binh_luan') id_binh_luan: string,
    @AccessToken() token: string,
  ) {
    return this.binhluanService.deleteCmt(+id_binh_luan, token);
  }
}
