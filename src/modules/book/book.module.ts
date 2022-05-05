import { Module } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';
import { Config } from 'src/config';
import { BookController } from './controllers/book.controller';
import { BookService } from './providers/book.service';

@Module({
  imports: [ConnectionProvider],
  controllers: Config.controllers.book,
  providers: Config.services.book,
  exports: [BookService]
})
export class BookModule {}
