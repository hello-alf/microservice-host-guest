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
  readonly lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `host ciudad` })
  readonly city: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `host pais` })
  readonly country: string;
}
