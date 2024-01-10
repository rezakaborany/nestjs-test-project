// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NotFoundError } from 'rxjs';
import { LoginDto, UserRegisterDTO } from './dto/user.dto';
import { UserInterface } from './schema/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async create(dto: UserRegisterDTO): Promise<UserInterface | { token: string, user: User }> {
        try {
            const { email, fullName, password } = dto
            let user = await this.userModel.findOne({ email }).select('-password').lean()
            if (user) {
                delete user.password;
                const token = await this.login(dto)
                return { token, user }
            } else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                user = await this.userModel.create({
                    fullName,
                    email,
                    password: hashedPassword,
                });
                return {
                    email: user.email,
                    fullName: user.fullName,
                    _id: user._id,
                    createdAt: user['createdAt'],
                    updatedAt: user['updatedAt']
                };
            }
        } catch (err) {
            throw err
        }
    }

    async login(dto: LoginDto): Promise<string> {
        const { email, password } = dto
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('user not found')
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new NotFoundException('user not found')
        }

        const payload = { email: user.email, userId: user._id };
        const token = this.generateToken(payload)
        return token
    }

    generateToken(data: object): string {
        return jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_SECRET_KEY_EXPIRE,
        });
    }
}
