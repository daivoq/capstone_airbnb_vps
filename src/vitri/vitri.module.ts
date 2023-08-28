import { Module } from '@nestjs/common';
import { VitriService } from './vitri.service';
import { VitriController } from './vitri.controller';
import { TokenService } from 'src/jwt/token.service';

@Module({
  controllers: [VitriController],
  providers: [VitriService, TokenService],
})
export class VitriModule {}
