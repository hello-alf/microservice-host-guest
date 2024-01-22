import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginHostDto {
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @ApiProperty({ description: `host email` })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host password` })
  readonly password: string;
}
