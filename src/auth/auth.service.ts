import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async validate(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      return {
        message: 'Invalid token',
      }
    }
  }
}
