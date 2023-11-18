import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host lastname` })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host ciudad` })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host pais` })
  readonly country: string;
}
