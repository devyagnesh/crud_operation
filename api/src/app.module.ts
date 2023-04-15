import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { MulterModule } from '@nestjs/platform-express/multer';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({ dest: './uploads' }),
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
