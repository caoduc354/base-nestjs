import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserType } from 'src/module/user/dto/user.dto';

export type RefreshTokenDocument = JwtRefreshToken & Document;

@Schema()
export class JwtRefreshToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, index: true })
  userId: string;

  @Prop(String)
  type?: UserType;

  @Prop(String)
  refreshToken: string;

  @Prop(String)
  clientId: string;

  @Prop(String)
  ipAddress: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(JwtRefreshToken);
