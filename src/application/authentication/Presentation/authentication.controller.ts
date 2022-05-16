import { Model, Document } from 'mongoose';
import { Body, Controller, HttpStatus, Inject, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from '../authentication.service';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';

import { UserDTO } from 'src/modules/user/dto/user.dto';
import UserSchema from 'src/modules/user/schemas/user.model';
import Registrable from 'src/utils/Ports/Registrable';
import Responseable from 'src/utils/Ports/Responseable';
import Logueable from 'src/utils/Ports/Logueable';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  private readonly userSchema: any;
  private responseService: Responseable;

  constructor(
    @Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.userSchema = new UserSchema();
  }

  @Post('register/:db')
  private async registration(
    @Res() response: Response,
    @Req() request: Request,
    @Param('db') db: string,
    @Body() payload: Registrable,
  ) {
    const userData: any = payload;
    const database: any = db;

    //const mailModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.mailSchema.name, this.mailSchema)
    //const sessionModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.sessionSchema.name, this.sessionSchema)
    const model: Model<Document, {}> = await this.connectionProvider.getModel(
      database,
      this.userSchema.name,
      this.userSchema,
    );

    if (database && database != '') {
      try {
        const registerResponse = await this.authenticationService.register(userData, database, model);
        if (registerResponse.result !== undefined) {
          /* let from: string = 'test.dicode@gmail.com'
						let pass: string = 'testdicode2021'
						let to: string = userData.email
						const emailResponse = await this.sendMailController.sendMail(
							to,
							`<!DOCTYPE html>
								<html lang="en">
								<head>
									<meta charset="UTF-8">
									<meta name="viewport" content="width=device-width, initial-scale=1.0">
									<title>Registro iMexico Real Estate</title>
								<body>
									<a href=${`https://imexico-frontend.herokuapp.com/${res.result.user._id}`}>
									<div>
										<img src="https://imexico-front.herokuapp.com/image/file/MAILING.png" alt="Registro iMexico Real Estate" style="width: 100%;"/>
									</div>
									</a>
								</body>
								</html>`,
							from,
							pass,
							'iMexico Real Estate - Validación de cuenta'
						) */

          /* if (emailResponse.result) {
							this.responserService.res = {
								result: emailResponse.result,
								message: "Usuario registrado correctamente. Te enviamos un e-mail para continuar con la validación de tu cuenta. En caso que no lo encuentres revisa tu casilla de spam.",
								status: emailResponse.status,
								error: emailResponse.error
							}
						} else {
							this.responserService.res = {
								result: emailResponse.result,
								message: emailResponse.message,
								status: emailResponse.status,
								error: emailResponse.error
							}
						} */
          this.responseService = {
            result: registerResponse.result,
            message: registerResponse.message,
            status: registerResponse.status,
            error: registerResponse.error,
          };

          /* if (res.status == 200) {
							this.sessionBuilder.getInstance([sessionModel, res.result.user._id])
						} */
        } else {
          this.responseService = {
            result: registerResponse.result,
            message: registerResponse.message,
            status: registerResponse.status,
            error: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      this.responseService = {
        result: {},
        message: 'Falta indicar a que negocio pertenece',
        status: HttpStatus.PRECONDITION_REQUIRED,
        error: 'Agregar el negocio al cual pertenece en la consulta',
      };
    }

    if (this.responseService.status) {
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }

  @Post('/login/:db')
  private async loggingIn(
    @Res() response: Response,
    @Req() request: Request,
    @Param('db') db: string,
    @Body() payload: Logueable,
  ) {
    const logInData: Logueable = payload;
    const database: string = db;

    //const sessionModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.sessionSchema.name, this.sessionSchema)
    //const permissionModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.permissionSchema.name, this.permissionSchema)

    if (database && database != '') {
      try {
        const model: Model<Document, {}> = await this.connectionProvider.getModel(
          database,
          this.userSchema.name,
          this.userSchema,
        );
        const loginResponse = await this.authenticationService.login(logInData, database, model, model);

        if (Object.keys(loginResponse.result).length > 0) {
          this.responseService = {
            result: loginResponse.result,
            message: loginResponse.message,
            status: loginResponse.status,
            error: loginResponse.error,
          };
        } else {
          this.responseService = {
            result: loginResponse.result,
            message: loginResponse.message,
            status: loginResponse.status,
            error: loginResponse.error,
          };
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      this.responseService = {
        result: {},
        message: 'Indicar a que db corresponde',
        status: HttpStatus.PRECONDITION_REQUIRED,
        error: 'No se ha indicado la db',
      };
    }

    if (this.responseService.status) {
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }
}
