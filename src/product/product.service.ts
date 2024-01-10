// product.service.ts
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, GetProductDto } from './dto/product.dto';
import { Product } from './schema/product.model';

@Injectable()
export class ProductService {
   constructor(
      @InjectModel('Product') private readonly productModel: Model<Product>,
   ) { }

   async create(dto: CreateProductDto): Promise<Product> {
      try {
         return this.productModel.create(dto)
      } catch (err) {
         throw err
      }

   }

   async findAll(dto: GetProductDto): Promise<{products : Product[] , count : number}> {
      try {
         const { page = 1, limit = 10, sortField, sortValue } = dto
         let sort = {};
         if (sortField && sortValue) {
            sort = { [`${sortField}`]: sortValue };
         } else {
            sort = { createdAt: -1 };
         }
         const products = await this.productModel
            .find({ userId: dto.userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort)
            .populate({ path: 'userId', select: 'fullName' })
            .exec();
            const count = await this.productModel.countDocuments({ userId: dto.userId })
            return {
               products,
               count
            }
      } catch (err) {
         throw err
      }
   }
}