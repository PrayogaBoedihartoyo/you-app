import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "../services/app.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateProfileDto } from "../dto/create-profile.dto";

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.appService.login(createUserDto);
  }

  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    try {
      return await this.appService.findUserByUsername(username);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Post(':username/profile')
  async createUserProfile(@Param('username') username: string, @Body() createProfileDto: CreateProfileDto) {
    try {
      return await this.appService.createUserProfile(username, createProfileDto);
    } catch (error) {
      return { message: error.message };
    }
  }
}
