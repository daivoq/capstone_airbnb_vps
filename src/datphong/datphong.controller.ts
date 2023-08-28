import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DatphongService } from './datphong.service';
import { DatPhongDto } from './dto/datphong.dto';
import { AccessToken } from 'src/jwt/jwt.accestoken';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Dat phong')
@ApiBearerAuth()
@Controller('datphong')
export class DatphongController {
  constructor(private readonly datphongService: DatphongService) {}

  @Get()
  getAll(@AccessToken() token: string) {
    return this.datphongService.getAll(token);
  }

  @Get('by-room/:id_room')
  getById(@Param('id_room') id_bill: string, @AccessToken() token: string) {
    return this.datphongService.getById(+id_bill, token);
  }

  @Get('by-user')
  getByIdUser(@AccessToken() token: string) {
    return this.datphongService.getByIdUser(token);
  }

  @Post(':ma_phong')
  createDatPhong(
    @Body() datPhongDto: DatPhongDto,
    @AccessToken() token: string,
  ) {
    return this.datphongService.createDatPhong(datPhongDto, token);
  }

  @Put(':id_bill/:ma_phong')
  update(
    @Param('id_bill') id_bill: string,
    @Body() datPhongDto: DatPhongDto,
    @AccessToken() token: string,
  ) {
    return this.datphongService.update(datPhongDto, +id_bill, token);
  }

  @Delete(':id_bill')
  delete(@Param('id_bill') id_bill: string, @AccessToken() token: string) {
    return this.datphongService.delete(+id_bill, token);
  }
}
