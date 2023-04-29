/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';

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

  userSubCategory: any;
}
