import { ApiProperty } from '@nestjs/swagger';
export class SearchDto {
  @ApiProperty({ description: 'search', type: String })
  search: string;
}
