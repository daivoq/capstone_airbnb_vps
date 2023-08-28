import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { NguoidungDto } from './dto/nguoidung.dto';
import { SearchDto } from './dto/search.dto';
import { AccessToken } from 'src/jwt/jwt.accestoken';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Nguoi Dung')
@ApiBearerAuth()
@Controller('nguoidung')
export class NguoidungController {
  constructor(public readonly nguoidungService: NguoidungService) {}

  @Get('get-all-role-admin')
  getAllUser(@AccessToken() token: string) {
    return this.nguoidungService.getAllUser(token);
  }
  //
  @Get()
  getUser(@AccessToken() token: string) {
    return this.nguoidungService.getUser(token);
  }

  //
  @Post('search-by-name')
  getSearchUser(@Body() searchDto: SearchDto, @AccessToken() token: string) {
    return this.nguoidungService.getSearchUser(searchDto, token);
  }

  //
  @Get('phan-trang/:page/:perPage')
  getPhanTrang(
    @Param('page') page: number,
    @Param('perPage') perPage: number,
    @AccessToken() token: string,
  ) {
    return this.nguoidungService.getPhanTrang(+page, +perPage, token);
  }

  //
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar người dùng',
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
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @AccessToken() token: string,
  ) {
    return this.nguoidungService.uploadAvatar(file, token);
  }

  //
  @Put('update')
  update(@Body() nguoidungDto: NguoidungDto, @AccessToken() token: string) {
    return this.nguoidungService.update(nguoidungDto, token);
  }

  //
  @Delete()
  delete(@AccessToken() token: string) {
    return this.nguoidungService.delete(token);
  }

  //
  @Delete('delete-role-admin/:id_user')
  deleteRoleAdmin(
    @Param('id_user') id_user: string,
    @AccessToken() token: string,
  ) {
    return this.nguoidungService.deleteRoleAdmin(token, +id_user);
  }
}
