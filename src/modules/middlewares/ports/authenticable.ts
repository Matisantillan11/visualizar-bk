import { NextFunction, Response } from 'express'
//import RequestWithUser from '@Presentation/Ports/RequestWithUser'

export default interface Authenticateable {
	authenticate(
		request: any,
		response: Response,
		next: NextFunction
	): Promise<void>
}