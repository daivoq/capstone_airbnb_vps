import { ApiProperty } from '@nestjs/swagger';

export class BinhLuanDto {
  // @ApiProperty({ description: 'ma_phong', type: Number })
  // ma_phong: number;
  @ApiProperty({ description: 'ma_nguoi_dung', type: String })
  noi_dung: string;
  @ApiProperty({ description: 'sao_binh_luan', type: Number })
  sao_binh_luan: number;
}
