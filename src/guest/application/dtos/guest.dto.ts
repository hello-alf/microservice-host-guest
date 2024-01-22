import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest lastname` })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest ciudad` })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest pais` })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @ApiProperty({ description: `guest email` })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest password` })
  readonly password: string;

  @IsBoolean()
  @ApiProperty({ description: `host` })
  readonly isHost: boolean;

  @IsBoolean()
  @ApiProperty({ description: `guest` })
  readonly isGuest: boolean;
}
