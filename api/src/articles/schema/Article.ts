import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true, index: true, lowercase: true, trim: true })
  title: string;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ required: true, lowercase: true, trim: true })
  description: string;

  @Prop({ required: true, lowercase: true, trim: true })
  author: string;

  @Prop({
    required: true,
    default: new Intl.DateTimeFormat('en-IN').format(new Date(Date.now())),
  })
  date: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
