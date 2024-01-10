import { IsEmail, IsNotEmpty , IsOptional, IsString} from "class-validator";

export class UserRegisterDTO { 
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    fullName: string;
}

export class LoginDto { 
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}