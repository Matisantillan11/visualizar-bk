import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Config } from './config';
import { DatabaseModule } from './application/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { ConnectionProvider } from './application/database/connectionProvider.service';
import { AppService } from './app.service';
import { EmailModule } from './application/email/email.module';
import { AuthenticationModule } from './application/authentication/authentication.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthenticationModule,
    EmailModule,
    UserModule,
    BookModule
  ],
  controllers: Config.controllers.app,
  providers: Config.services.app,
  exports: [AppService],
})
export class AppModule {}
