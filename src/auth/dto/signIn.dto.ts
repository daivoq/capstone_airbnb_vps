import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'pass_word', type: String })
  pass_word: string;
}
