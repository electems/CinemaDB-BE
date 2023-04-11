import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormElementsDto {
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
  element?: string;

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
  static?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  required?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  bold?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  italic?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHavePageBreakBefore?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveAlternateForm?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveDisplayHorizontal?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveOptionCorrect?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveOptionValue?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canPopulateFromApi?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  formId: number;
}

export class UpdateFormElementsDto {
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
  element?: string;

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
  static?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  required?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  bold?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  italic?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHavePageBreakBefore?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveAlternateForm?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveDisplayHorizontal?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveOptionCorrect?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canHaveOptionValue?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  canPopulateFromApi?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  formId: number;
}

export class FindFormElementsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ConnectFormElementsDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
