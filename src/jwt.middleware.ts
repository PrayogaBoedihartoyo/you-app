// jwt.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', ''); // Dapatkan token dari header

    if (token) {
      try {
         // Verifikasi token
        req['user'] = this.jwtService.verify(token); // Tambahkan data pengguna ke objek permintaan

        next(); // Lanjutkan permintaan
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' }); // Token tidak valid
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // Token tidak ada
    }
  }
}
