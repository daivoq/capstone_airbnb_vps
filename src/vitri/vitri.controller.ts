import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VitriService } from './vitri.service';
import { VitriDto } from './dto/vitri.dto';
import { AccessToken } from 'src/jwt/jwt.accestoken';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Vi tri')
@ApiBearerAuth()
@Controller('vitri')
export class VitriController {
  constructor(private readonly vitriService: VitriService) {}

  @Get()
  getAll(@AccessToken() token: string) {
    return this.vitriService.getAll(token);
  }

  @Get(':ma_vi_tri')
  getById(@Param('ma_vi_tri') ma_vi_tri: string, @AccessToken() token: string) {
    return this.vitriService.getById(+ma_vi_tri, token);
  }

  @Get('phan-trang/:page/:perPage')
  getPhanTrang(
    @Param('page') page: number,
    @Param('perPage') perPage: number,
    @AccessToken() token: string,
  ) {
    return this.vitriService.getPhanTrang(+page, +perPage, token);
  }

  @Post('create-role-admin')
  createViTri(@Body() vitriDto: VitriDto, @AccessToken() token: string) {
    return this.vitriService.createViTri(vitriDto, token);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Hình ảnh vị trí',
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
  @Post('upload-image-role-admin/:ma_vi_tri')
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Param('ma_vi_tri') id: string,
    @AccessToken() token: string,
  ) {
    return this.vitriService.uploadImg(file, +id, token);
  }

  @Put('update-role-admin/:ma_vi_tri')
  update(
    @Param('ma_vi_tri') ma_vi_tri: string,
    @Body() vitriDto: VitriDto,
    @AccessToken() token: string,
  ) {
    return this.vitriService.update(+ma_vi_tri, vitriDto, token);
  }

  @Delete('delete-role-admin/:ma_vi_tri')
  delete(@Param('ma_vi_tri') ma_vi_tri: string, @AccessToken() token: string) {
    return this.vitriService.delete(+ma_vi_tri, token);
  }
}
