import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 40)
  password!: string;
}
