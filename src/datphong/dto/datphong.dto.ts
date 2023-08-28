import { ApiProperty } from '@nestjs/swagger';

export class DatPhongDto {
  @ApiProperty({ description: 'ma_phong', type: Number })
  ma_phong: number;
  @ApiProperty({ description: 'ngay_den', type: String })
  ngay_den: string;
  @ApiProperty({ description: 'ngay_di', type: String })
  ngay_di: string;
  @ApiProperty({ description: 'so_luong_khach', type: Number })
  so_luong_khach: number;
}
