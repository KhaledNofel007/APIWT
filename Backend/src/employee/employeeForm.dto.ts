import { IsNotEmpty, IsInt, Length, IsEmail, IsOptional } from 'class-validator';

export class CreateEmployee {
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @Length(3, 8)
    @IsNotEmpty()
    password: string;    
}

export class CreateUser {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    department: string;

    @IsInt()
    salary: number;

    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    employeeId: number;
    
}
