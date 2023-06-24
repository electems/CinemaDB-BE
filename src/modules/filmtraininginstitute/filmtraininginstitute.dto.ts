/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';

export class AuditionCallDto {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'Male Lead Role' })
  auditionCategory: string;

  @ApiProperty({ example: 'Appying for male lead role ' })
  auditionDescription: string | null;

  @ApiProperty({ example: 'Male' })
  gender: string | null;

  @ApiProperty({ example: '15-20' })
  ageRange: string;

  @ApiProperty({ example: '2hrs' })
  timeDurationForAudition: string;

  @ApiProperty({ example: 'Kannada' })
  preferredLanguageToSpeak: string;

  @ApiProperty({ example: 'Action' })
  movieType: string;

  @ApiProperty({ example: 'facebook.com' })
  seoTags: string;

  @ApiProperty({ example: 'cinema@gmail.com' })
  auditionAgencyEmailId: string;

  @ApiProperty({ example: '1234567890' })
  contactNumber: number;

  @ApiProperty({ example: 'Love to act in movie' })
  auditionReason: string;

  @ApiProperty({ example: 'Banglore' })
  venueOrInterviewLocation: string;

  @ApiProperty({ example: '5hrs' })
  duration: string;

  @ApiProperty({ example: '1' })
  movieFk: string;

  @ApiProperty({ example: '1' })
  userFK: string;
}

export class CreateAuditionCallDto {

  @ApiProperty({ example: 'Male Lead Role' })
  auditionCategory: string;

  @ApiProperty({ example: 'Appying for male lead role ' })
  auditionDescription: string | null;

  @ApiProperty({ example: 'Male' })
  gender: string | null;

  @ApiProperty({ example: '15-20' })
  ageRange: string;

  @ApiProperty({ example: '2hrs' })
  timeDurationForAudition: string;

  @ApiProperty({ example: 'Kannada' })
  preferredLanguageToSpeak: string;

  @ApiProperty({ example: 'Action' })
  movieType: string;

  @ApiProperty({ example: 'facebook.com' })
  seoTags: string;

  @ApiProperty({ example: 'cinema@gmail.com' })
  auditionAgencyEmailId: string;

  @ApiProperty({ example: '1234567890' })
  contactNumber: number;

  @ApiProperty({ example: 'Love to act in movie' })
  auditionReason: string;

  @ApiProperty({ example: 'Banglore' })
  venueOrInterviewLocation: string;

  @ApiProperty({ example: '5hrs' })
  duration: string;

  @ApiProperty({ example: '1' })
  movieFk: string;

  @ApiProperty({ example: '1' })
  userFK: string;
}
