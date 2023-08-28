import { ApiProperty } from '@nestjs/swagger';

export class VitriDto {
  @ApiProperty({ description: 'ten_vi_tri', type: String })
  ten_vi_tri: string;
  @ApiProperty({ description: 'tinh_thanh', type: String })
  tinh_thanh: string;
  @ApiProperty({ description: 'quoc_gia', type: String })
  quoc_gia: string;
}
