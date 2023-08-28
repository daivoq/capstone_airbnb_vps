import { Module } from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { BinhluanController } from './binhluan.controller';
import { TokenService } from 'src/jwt/token.service';

@Module({
  providers: [BinhluanService, TokenService],
  controllers: [BinhluanController],
})
export class BinhluanModule {}
