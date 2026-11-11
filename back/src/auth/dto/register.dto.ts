import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 40)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 40)
  brandName!: string;

  @IsNotEmpty()
  @IsBoolean()
  termsAndConditions!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  privacyPolicy!: boolean;
}
