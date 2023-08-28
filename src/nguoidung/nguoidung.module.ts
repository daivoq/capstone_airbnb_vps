import { Module } from '@nestjs/common';
import { NguoidungController } from './nguoidung.controller';
import { NguoidungService } from './nguoidung.service';
import { TokenService } from 'src/jwt/token.service';

@Module({
  controllers: [NguoidungController],
  providers: [NguoidungService, TokenService],
})
export class NguoidungModule {}
