import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: {
      displayName: String,
      gender: String,
      birthday: Date,
      horoscope: String,
      zodiac: String,
      height: Number,
      weight: Number,
      interests: [String],
    },
  })
  profile: {
    displayName: string;
    gender: string;
    birthday: Date;
    horoscope: string;
    zodiac: string;
    height: number;
    weight: number;
    interests: string[];
  };
}

export const UserModel = SchemaFactory.createForClass(User);
