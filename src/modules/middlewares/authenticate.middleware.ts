import { AppService } from 'src/app.service'
import { Config } from 'src/config'
import { ConnectionProvider } from 'src/application/database/connectionProvider.service'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Model, Document} from 'mongoose'
import { NextFunction, Response } from 'express'
import Authenticateable from './ports/authenticable'
import DataStoredInTokenable from './ports/DataStoredInTokenable'
import UserSchema from 'src/modules/user/schemas/user.model'
import User from 'src/modules/user/interfaces/user.interface'
import Responseable from 'src/utils/Ports/Responseable'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class Authentication {
	private readonly userSchema: UserSchema
	private responserService: Responseable
	constructor(
		@Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
		private readonly appService: AppService
	){
		this.userSchema = new UserSchema()
	}

	async use(request: any, response: Response, next: NextFunction) {

		let nextBool: boolean = false

		if (request.headers && request.headers.authorization) {
			//validation of jwt
			let token = request.headers.authorization.replace(/['"]+/g, '');
			const secret = Config.enviroment.tokenSecret;
			try {
				let verificationResponse: DataStoredInTokenable = await jwt.verify(token, secret) as DataStoredInTokenable;
				if(verificationResponse?._id && verificationResponse?.database) {	
					
					const id = verificationResponse?._id;
					const database: string = verificationResponse?.database;
					
					let userModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.userSchema.name, this.userSchema)
					
					//Get user 
					let limit = 1
					let skip = 0
					let match = {
						_id: {$oid: id }
					}

					let aggregations = { match, limit, skip}
					
					const controllerResponse = await this.appService.getAll(userModel, aggregations)
					
					if(Object.entries(controllerResponse?.result).length > 0){
						let userInterface: User = controllerResponse?.result

						if(userInterface?.enabled){

							request.user = userInterface
							request.database = database
							nextBool = true

							next()
						} else {
							this.responserService = {
								result: {},
								message: 'Usuario bloqueado',
								error: 'El usuario con el que intenta ingresar no se encuentra habilitado.',
								status: HttpStatus.PRECONDITION_REQUIRED
							}
						}
					} else {
						this.responserService = { 
							result: [], 
							message: controllerResponse.message, 
							error: controllerResponse.error, 
							status: controllerResponse.status 
						}
					}

				} else {
					this.responserService = {
						result: {},
						message: 'Credenciales inválidas',
						error: 'La credenciales se encuentran vencidas.',
						status: HttpStatus.UNAUTHORIZED
					}
				}
			} catch (error) {
				this.responserService = {
					result: {},
					message: error.message,
					error: error,
					status: HttpStatus.UNAUTHORIZED
				}
			}
			
		} else {
			this.responserService = {
				result: {},
				message: 'Debes iniciar sesión para continuar.',
				error: 'Credenciales no provistas',
				status: HttpStatus.UNAUTHORIZED
			}
		}

		if(!nextBool) {
			response.status(this.responserService.status).send(this.responserService)
		}
	}
}