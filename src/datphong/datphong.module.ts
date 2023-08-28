import { Module } from '@nestjs/common';
import { DatphongService } from './datphong.service';
import { DatphongController } from './datphong.controller';
import { TokenService } from 'src/jwt/token.service';

@Module({
  controllers: [DatphongController],
  providers: [DatphongService, TokenService],
})
export class DatphongModule {}
