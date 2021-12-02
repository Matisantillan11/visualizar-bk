import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { generateJWT } from '../../helpers/generateJWT'
import { TokenInterface } from '../../middlewares/isAuthenticated'
import User from '../../models/User/user'
import { customResponse } from '../../helpers/customResponse';
export const loginUser = async (req:Request, res:Response) => {
	try {
		
		let { email, password } = req.body


		const user = await User.findOne({ email })
		let canLogin: boolean = false
		if(user){
			const correctPassword: boolean = await compare( password, user.password)
			if(correctPassword){
				if(user.active){
					canLogin = true
					const token = await generateJWT(user._id)
					user["password"] = ''

					let response: {user: any, token: any} = {user, token}
					return res.send(customResponse(202, response, false, "Iniciaste sesión correctamente"))
				}else{
					return res.send(customResponse(401, [], true, "No pudimos validar tus credenciales"))
				}
				
			} else{
				return res.send(customResponse(401, [], true, "No pudimos validar tus credenciales"))
			}
		} else {
			return res.send(customResponse(401, [], true, "No pudimos validar tus credenciales"))
		}

		
	} catch (error) {
		console.error({ error })
		return res.send(customResponse(401, [], true, "No pudimos validar tus credenciales"))
	}

}

export const validateUser = async (req: Request, res: Response) => {
	const token = req.header('x-token')
	if(!token){
		return res.send(customResponse(401, [], true, "Token no provisto"))
	}

	try {
		const { uid }: TokenInterface = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as TokenInterface
		const user = await User.findById(uid)

		if(!user){
			return res.send(customResponse(401, [], true, "Usuario no encontrado"))
		}

		if(!user.active){
			return res.send(customResponse(401, [], true, "Token Inválido"))
		}
	
		let response: {user: any, token: string} = {user, token}
		return res.send(customResponse(202, response, false, ""))
	} catch (error) {

		console.log({ error })
		return res.send(customResponse(401, [], true, "Token Inválido"))

	}
}

