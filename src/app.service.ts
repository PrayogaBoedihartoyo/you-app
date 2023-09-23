import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./create-user.dto";
import { CreateProfileDto } from "./create-profile.dto";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  getHello(): string {
    return 'Hello World!';
  }
  async createUser(createUserDto: CreateUserDto) {
    const { email, username, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const check_user = await this.userModel.findOne({ username });
    if (check_user) {
      return {
        message: 'User already exists',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });

    try {
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: 'Invalid username or password',
      }
    }

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    user.password = undefined;

    return user;
  }


  async createUserProfile(username: string, createProfileDto: CreateProfileDto) {
    const user = await this.findUserByUsername(username);
    user.profile = {
      ...createProfileDto,
    };

    await user.save();

    return user.profile;
  }
}
