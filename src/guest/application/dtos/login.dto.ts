import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginGuestDto {
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @ApiProperty({ description: `guest email` })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest password` })
  readonly password: string;
}
