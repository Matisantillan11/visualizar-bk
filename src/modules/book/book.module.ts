import { Module } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';
import { Config } from 'src/config';
import { BookService } from './providers/book.service';

@Module({
  imports: [ConnectionProvider],
  controllers: Config.controllers.book,
  providers: Config.services.book,
  exports: [BookService]
})
export class BookModule {}
