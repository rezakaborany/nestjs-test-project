// product.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId , Types } from 'mongoose';
import { User } from 'src/user/schema/user.model';

@Schema()
export class Product extends Document {
    @Prop({ type: String})
    name: string;

    @Prop({ type: Types.ObjectId , ref : User.name })
    userId: ObjectId;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Number })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);