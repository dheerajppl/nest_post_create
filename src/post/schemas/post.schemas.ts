
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId})
  createdBy: mongoose.Types.ObjectId;

}

export const PostSchema = SchemaFactory.createForClass(Post);
