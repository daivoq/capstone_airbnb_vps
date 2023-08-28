import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Body,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongDto } from './dto/phong.dto';
import { AccessToken } from 'src/jwt/jwt.accestoken';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Phong')
@ApiBearerAuth()
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  getAll(@AccessToken() token: string) {
    return this.phongService.getAll(token);
  }

  @Get('theo-vi-tri/:ma_vi_tri')
  getByViTri(
    @Param('ma_vi_tri') ma_vi_tri: string,
    @AccessToken() token: string,
  ) {
    return this.phongService.getByViTri(+ma_vi_tri, token);
  }

  @Get('phan-trang/:page/:perPage')
  getPhanTrang(
    @Param('page') page: number,
    @Param('perPage') perPage: number,
    @AccessToken() token: string,
  ) {
    return this.phongService.getPhanTrang(+page, +perPage, token);
  }

  @Get(':id_phong')
  getById(@Param('id_phong') id_phong: string, @AccessToken() token: string) {
    return this.phongService.getById(+id_phong, token);
  }

  @Post('create-room-role-admin')
  createPhong(@Body() phongDto: PhongDto, @AccessToken() token: string) {
    return this.phongService.createPhong(phongDto, token);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Hình ảnh phòng',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-image-role-admin/:id_phong')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Param('id_phong') id_phong: string,
    @AccessToken() token: string,
  ) {
    return this.phongService.uploadImg(file, +id_phong, token);
  }

  @Put('update-role-admin/:id_phong')
  update(
    @Body() phongDto: PhongDto,
    @Param('id_phong') id_phong: string,
    @AccessToken() token: string,
  ) {
    return this.phongService.update(phongDto, +id_phong, token);
  }

  @Delete('delete-role-admin/:id_phong')
  delete(@Param('id_phong') id_phong: string, @AccessToken() token: string) {
    return this.phongService.delete(+id_phong, token);
  }
}
