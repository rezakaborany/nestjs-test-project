// product.controller.ts
import { Body, Controller, Post, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AuthorizedGuard } from 'src/common/verify';
import { CreateProductDto, GetProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Request } from 'express';
import { Product } from './schema/product.model';

@UseGuards(AuthorizedGuard)
@Controller('product')
export class ProductController {
   constructor(private readonly productService: ProductService) { }

   @Post('')
   async createProduct(@Body() dto: CreateProductDto, @Req() req: Request): Promise<Product> {
      dto.userId = req['user']
      return this.productService.create(dto);
   }

   @Get()
   async findAllProducts(@Query() dto: GetProductDto, @Req() req: Request): Promise<{products : Product[] , count : number}> {
      dto.userId = req['user']
      return this.productService.findAll(dto);
   }
}