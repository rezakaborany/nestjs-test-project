import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor() {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        if (req.headers.authorization) {
            const bearerHeader = req.headers.authorization;
            const token = bearerHeader.split(' ')[1];
            try {
                const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
                if (!payload) {
                    throw new UnauthorizedException('request is not authorized to use this endpoint');
                }
                req['user'] = payload['userId'];
                return true;
            } catch (e) {
                throw new UnauthorizedException('request is not authorized to use this endpoint');
            }
        } else {
            throw new UnauthorizedException('request is not authorized to use this endpoint');
        }
    }
}
