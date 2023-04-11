import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormOptionsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  correct?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  formElementsId: number;
}

export class UpdateFormOptionsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({})
  @IsNotEmpty()
  @IsDate()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  correct?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  formElementsId: number;
}

export class FindFormOptionsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ConnectFormOptionsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
