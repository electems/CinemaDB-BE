/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class LoggedUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: 'string', nullable: true })
  firstName: string | null;

  @ApiProperty({ type: 'string', nullable: true })
  lastName: string | null;

  @ApiProperty()
  token: string;

  @ApiProperty()
  role: string | null;

  step: string | null;

  industrySelection: any;

  userSubCategory: Prisma.JsonArray;

  userName: string

  planId: number
  
  status: string
}
