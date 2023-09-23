import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { User, UserModel } from "./model/user.model";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ViaPulsa:nonOwMo9OJNDchFQ@cluster0.2kkbdxg.mongodb.net/?retryWrites=true&w=majority', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
