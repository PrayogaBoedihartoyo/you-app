import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { User, UserModel } from "./model/user.model";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { JwtMiddleware} from "./jwt.middleware";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ViaPulsa:nonOwMo9OJNDchFQ@cluster0.2kkbdxg.mongodb.net/?retryWrites=true&w=majority', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
      .forRoutes(
        '/api/:username/profile',
        // '/api/:username' // AKTIFKAN JIKA INGIN MEMPROTEKSI ROUTE
      );
  }
}
