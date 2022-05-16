import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Config } from './config';
import { DatabaseModule } from './application/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { AppService } from './app.service';
import { EmailModule } from './application/email/email.module';
import { AuthenticationModule } from './application/authentication/authentication.module';
import { BookModule } from './modules/book/book.module';
import { AwsModule } from './modules/aws/aws.module';
import { Authentication } from './modules/middlewares/authenticate.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AwsModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).exclude({ path: Config.excludedRoutes.path, method: RequestMethod.GET}, {path: Config.excludedRoutes.authPath, method: RequestMethod.ALL}).forRoutes('*');
  }
}
