import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';

import { FormElements } from './formElements.entity';

export class FormOptions {
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

  @ApiProperty({
    type: FormElements,
  })
  @IsOptional()
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  Formelements: FormElements;
}
