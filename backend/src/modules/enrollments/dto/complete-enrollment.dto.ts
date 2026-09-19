import { IsDateString, IsNotEmpty } from 'class-validator';

export class CompleteEnrollmentDto {
  @IsDateString()
  @IsNotEmpty()
  completionDate: string;
}