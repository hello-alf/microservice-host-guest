import { IsString, IsNotEmpty } from 'class-validator';
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
}
