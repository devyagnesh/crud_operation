import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, callback) {
          console.log('came here');
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          callback(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
    }),
  )
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createArticleDto.imgUrl = `http://localhost:3000/${file.filename}`;
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, callback) {
          console.log('came here');
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          callback(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('FILE :', file);
      console.log('ID', id);
      updateArticleDto.imgUrl = `http://localhost:3000/${file.filename}`;
      return this.articlesService.update(id, updateArticleDto);
    } catch (error) {
      console.log('ERROR : ', error);
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
