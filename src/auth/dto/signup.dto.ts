import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ description: 'name', type: String })
  name: string;
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'pass_word', type: String })
  pass_word: string;
  @ApiProperty({ description: 'phone', type: String })
  phone: string;
  @ApiProperty({ description: 'birth_day', type: String })
  birth_day: string;
  @ApiProperty({ description: 'gender', type: String })
  gender: string;
  @ApiProperty({ description: 'role', type: String })
  role: string;
}
