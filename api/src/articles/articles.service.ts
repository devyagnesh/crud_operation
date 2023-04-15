import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/Article';
import { Model } from 'mongoose';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleDto: CreateArticleDto): Promise<Article> {
    const model = new this.articleModel();
    model.title = createArticleDto.title;
    model.imgUrl = createArticleDto.imgUrl;
    model.description = createArticleDto.description;
    model.author = createArticleDto.author;

    return model.save();
  }

  findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  findOne(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel
      .updateOne(
        { _id: id },
        {
          title: updateArticleDto.title,
          imgUrl: updateArticleDto.imgUrl,
          description: updateArticleDto.description,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.articleModel.deleteOne({ _id: id });
  }
}
