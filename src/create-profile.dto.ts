import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
  @IsString()
  displayName: string;

  @IsEnum(['male', 'female'])
  gender: string;

  @IsDate()
  birthday: Date;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;
}
