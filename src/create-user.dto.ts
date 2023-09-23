// create-user.dto.ts
// @ts-ignore
import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  confirmPassword: string;


  @IsEmail()
  displayName: string;

  @IsString()
  gender: string;

  @IsString()
  birthday: string;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsString()
  Height: string;

  @IsString()
  Weight: string;
}
