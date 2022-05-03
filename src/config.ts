import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolService } from 'src/modules/user/providers/rol.service';
import { UserService } from 'src/modules/user/providers/user.service';
import { RolController } from 'src/modules/user/controllers/rol.controller';
import { UserController } from 'src/modules/user/controllers/user.controller';

export const Config = {
  enviroment: {
    port: process.env.PORT,
    company: process.env.DB_NAME,
    front: process.env.FRONT,
    cluster: process.env.NODE_ENV === 'PROD' ? process.env.CLUSTER : process.env.CLUSTER_TEST,
    tokenSecret: process.env.TOKEN_SECRET || 'g4LT0kenS3cr3t',
  },
  services: {
    app: [AppService],
    user: [AppService, UserService, RolService],
  },
  controllers: {
    app: [AppController],
    user: [UserController, RolController],
  },
};
