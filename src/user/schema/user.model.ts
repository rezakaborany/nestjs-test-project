import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ type: String })
    fullName: string;

    @Prop({ type: String, unique: true })
    email: string;

    @Prop({ type: String })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);