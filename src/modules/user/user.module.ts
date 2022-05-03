import { Module } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';
import { Config } from 'src/config';
import { UserService } from 'src/modules/user/providers/user.service';

@Module({
  imports: [ConnectionProvider],
  controllers: Config.controllers.user,
  providers: Config.services.user,
  exports: [UserService],
})
export class UserModule {}
