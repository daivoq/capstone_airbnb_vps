import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { TokenService } from 'src/jwt/token.service';

@Module({
  controllers: [PhongController],
  providers: [PhongService, TokenService],
})
export class PhongModule {}
