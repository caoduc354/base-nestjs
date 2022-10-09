import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto, UserDTO } from '../dto/user.dto';
import { User, UserDocument } from '../model/user';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async getAllUser(): Promise<User[]> {
    return await this.userModel.find({}).exec();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: userId });
  }

  async updateUser(userId: string, user: Partial<UserDTO>): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, user, { new: true });
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);

      const result = await this.userModel.create(newUser);

      return result;
    } catch (err) {
      return err;
    }
  }

  async getUserByName(userName: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({
      where: {
        userName,
      },
    });

    return user;
  }
}
