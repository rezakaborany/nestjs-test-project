import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    userId: string
}

export class GetProductDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    page: number;

    @IsOptional()
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsString()
    sortField: string;

    @IsOptional()
    @IsString()
    sortValue: string;

    userId: string
}