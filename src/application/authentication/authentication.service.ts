import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

import CreateableToken from 'src/application/authentication/Ports/CreateableToken';
//import Logueable from '@Domain/Entities/User/Ports/Logueable'
//import Controlleable from '@Domain/Entities/Util/Ports/Controlleable'
//import SendeableMail from './../UC/Ports/SendeableMail'
import UserTokenable from 'src/application/authentication/Ports/UserTokenable';
import UserToken from './utils/UserToken';
import Responser from 'src/application/authentication/utils/Responser';
import Responseable from 'src/utils/Ports/Responseable';
import { UserService } from 'src/modules/user/providers/user.service';
import { AppService } from 'src/app.service';
import TokenProvider from './utils/TokenProvider';
import Authenticable from './Ports/Authenticable';
import Registrable from './Ports/Registrable';
import Logueable from 'src/utils/Ports/Logueable';

@Injectable()
export class AuthenticationService implements Authenticable {
  //@inject(TYPES.SendeableMail) private sendMailController: SendeableMail
  constructor(
    private readonly AppService: AppService,
    private readonly userService: UserService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  public async register(userData: Registrable, database: string, model: Model<Document, {}>): Promise<Responseable> {
    let responserService: Responseable = new Responser();
    let register: UserTokenable = new UserToken();

    try {
      const existUserEmail = await this.userService.existUserWithThatEmail(userData.email, model);
      if (!existUserEmail) {
        const hashedPassword = await this.userService.hashPassword(userData.password);
        userData.password = hashedPassword;

        const saveResponse = await this.userService.create(model, userData, '');
        if (saveResponse.result) {
          register.user = saveResponse.result;
          register.user.password = undefined;
          register.token = this.tokenProvider.createToken(register.user, database);

          responserService = {
            result: {
              user: register.user,
              token: register.token,
            },
            message: 'Registro exitoso',
            error: '',
            status: 200,
          };
        } else {
          responserService = {
            result: [],
            message: saveResponse.message,
            error: saveResponse.error,
            status: saveResponse.status,
          };
        }
      } else {
        responserService = {
          result: [],
          message: 'El usuario ya se encuentra registrado.',
          error: 'Usuario ya registrado.',
          status: 500,
        };
      }

      return responserService;
    } catch (error) {
      return (responserService = {
        result: error.result,
        message: error.message,
        error: error.error,
        status: error.status,
      });
    }
  }

  public async login(
    loginData: Logueable,
    database: string,
    model: Model<Document, {}>,
    permissionModel: Model<Document, {}>,
  ): Promise<Responseable> {
    let responserService: Responseable = new Responser();
    let login: UserTokenable = new UserToken();

    try {
      const existUserEmail = await this.userService.existUserWithThatEmail(loginData.email, model);
      if (existUserEmail) {
        const userResponse = await this.userService.getUserByEmail(loginData.email, model, permissionModel);
        if (userResponse.result) {
          login.user = userResponse.result;

          const matched = await this.userService.isMatch(loginData.password, login.user.password);
          const isEnabled = await this.userService.isEnable(login.user._id, model);

          if (matched) {
            if (isEnabled) {
              login.user.password = undefined;
              login.token = this.tokenProvider.createToken(login.user, database);
              responserService = {
                result: {
                  user: login.user,
                  token: login.token,
                },
                message: 'Bienvenido ' + login.user.email,
                error: '',
                status: 200,
              };
            } else {
              responserService = {
                result: [],
                message: `El usuario ${loginData.email} no se encuentra habilitado.`,
                error: '',
                status: 404,
              };
            }
          } else {
            responserService = {
              result: [],
              message: 'No se pudo iniciar sesión. Credenciales inválidas',
              error: '',
              status: 404,
            };
          }
        }
      } else {
        responserService = {
          result: [],
          message: `El correo ${loginData.email} no se encuetra registrado`,
          error: '',
          status: 404,
        };
      }

      return responserService;
    } catch (error) {
      console.log(error.message);
      throw new Error(`No se pudo iniciar sesión. Error: ${error.message}`);
    }
  }
}
