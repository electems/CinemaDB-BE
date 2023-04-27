import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';

import { FormElements } from './formElements.entity';

export class Form {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    isArray: true,
    type: FormElements,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @IsObject()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  FormElements: FormElements[];
}
