import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { UserRoles } from '../enums/user.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @IsNotEmpty()
  @ApiProperty()
  @Prop()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  @Prop()
  lastName: string;

  @IsPhoneNumber()
  @ApiProperty()
  @Prop()
  phoneNumber: string;

  @IsEmail()
  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @ApiProperty()
  @Prop({ Type: UserRoles, enum: [UserRoles], default: UserRoles.MEMBER })
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
