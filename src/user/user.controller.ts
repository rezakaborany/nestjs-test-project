// product.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, UserRegisterDTO } from './dto/user.dto';
import { UserInterface } from './schema/user.interface';
import { User } from './schema/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Post()
   async loginOrRegister(@Body() dto: UserRegisterDTO): Promise<UserInterface | {token : string , user : User}> {
      return this.userService.create(dto)
   }
}