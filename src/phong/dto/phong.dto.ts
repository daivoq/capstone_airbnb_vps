import { ApiProperty } from '@nestjs/swagger';

export class PhongDto {
  @ApiProperty({ description: 'ten_phong', type: String })
  ten_phong: string;
  @ApiProperty({ description: 'khach', type: Number })
  khach: number;
  @ApiProperty({ description: 'phong_ngu', type: Number })
  phong_ngu: number;
  @ApiProperty({ description: 'giuong', type: Number })
  giuong: number;
  @ApiProperty({ description: 'phong_tam', type: Number })
  phong_tam: number;
  @ApiProperty({ description: 'mo_ta', type: String })
  mo_ta: string;
  @ApiProperty({ description: 'gia_tien', type: Number })
  gia_tien: number;
  @ApiProperty({ description: 'may_giat', type: Boolean })
  may_giat: boolean;
  @ApiProperty({ description: 'ban_la', type: Boolean })
  ban_la: boolean;
  @ApiProperty({ description: 'tivi', type: Boolean })
  tivi: boolean;
  @ApiProperty({ description: 'dieu_hoa', type: Boolean })
  dieu_hoa: boolean;
  @ApiProperty({ description: 'wifi', type: Boolean })
  wifi: boolean;
  @ApiProperty({ description: 'bep', type: Boolean })
  bep: boolean;
  @ApiProperty({ description: 'do_xe', type: Boolean })
  do_xe: boolean;
  @ApiProperty({ description: 'ho_boi', type: Boolean })
  ho_boi: boolean;
  @ApiProperty({ description: 'ban_ui', type: Boolean })
  ban_ui: boolean;
  @ApiProperty({ description: 'ma_vi_tri', type: Number })
  ma_vi_tri: number;
}
