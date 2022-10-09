import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { hashString } from 'src/utils/auth';
import { CreateUserInput, UserDTO } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('/api/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('create')
  async createUser(@Body() input: UserDTO) {
    const password = hashString(input.password);

    return await this.UserService.createUser({ ...input, password: password });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.UserService.getUserById(id);
  }

  @Get()
  async getAllUser() {
    return await this.UserService.getAllUser();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UserDTO) {
    return await this.UserService.updateUser(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.UserService.deleteUser(id);
  }
}
