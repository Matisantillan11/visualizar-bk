import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import config from '../config';

import User from '../models/User/user'
import { customResponse } from '../helpers/customResponse';
import fileUpload from 'express-fileupload';

const cloudinary = require('cloudinary').v2
cloudinary.config({ 
  cloud_name: 'dj9mg8pvk', 
  api_key: config.CLOUDINARY_API_KEY, 
  api_secret: config.CLOUDINARY_API_SECRET,
	secure: true
});

export const getUser = async (req: Request, res: Response) => {
	try {
		const idUser = req.query.id
		let user

		if (idUser) {
			user = await User.find({ _id: idUser, active: true})	
		} else {
			user = await User.find({ active: true})
			
		}
	
		return res.send(customResponse(201, user, false, ""))
	} catch (error: any) {
		console.log(error.message)
		return res.send(customResponse(500, [], true, "No se pudo obtener los/el usuario."))
	}
}

export const postUser = async (req: Request, res: Response) => {
	try {
		const { fullname, dni, role, email, password, school } = req.body
		const salt = 10
		const hashedPassword = await bcrypt.hash(password, salt)
		
		const user = new User ({
			fullname,
			dni,
			role,
			email,
			school,
			active: false,
			password: hashedPassword,
		})

		await user.save()
		user["password"] = ''

		return res.send(customResponse(201, user, false, "Usuario creado correctamente"))
	} catch (error: any) {
		console.error(error.message)
		return res.send(customResponse(500, [], true, "No se pudo crear el usuario."))
	}
}

export const putUser = async (req: Request, res: Response) => {
	const idUser = req.params.id
	const { fullname, dni, email } = req.body
	const user = {
		fullname,
		dni,
		email,
	}

	try {

		
		await User.updateOne({ _id: idUser }, user)

		return res.send(customResponse(200, user, false, "Usuario actualizado correctamente"))
	} catch (error: any) {
		console.log(error.message)
		return res.send(customResponse(500, [], true, "No se pudo actualizar el usuario."))
	}
}

export const updateImage = async (req: Request, res: Response) => {
	const { id } = req.params

	if(!req.files || Object.keys(req.files).length === 0){
		return res.send(customResponse(500, [], true, 'No se encontraron archivos para subir. Por favor, asegurate de haber elegido una imagen para tu foto de perfil'))
	}

	try {
		const user = await User.findById(id)
		if(user){
	
			if(user.profileImage){

				const url = user.profileImage.split('/')
				const [ publicUrl ]: any = url?.pop()?.split(".");

				cloudinary.uploader.destroy(publicUrl);
			}

			const file: any = req.files.profileImage
			const {secure_url} = await cloudinary.uploader.upload(file?.tempFilePath)
			console.log("File uploaded")
			
			user.profileImage = secure_url

			await User.updateOne({_id: id}, user )

			return res.send(customResponse(201, user , false, 'Foto de perfil actualizada correctamente'))
			
		}else{
			return res.send(customResponse(404, [], true, 'No se encontró el usuario.'))
		}
	} catch (error: any) {
		return res.send(customResponse(500, [], true, error?.message))
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	const idUser = req.params.id
	const user = {
		active: false
	}

	try {
		await User.updateOne({ _id: idUser }, user)
		return res.send(customResponse(201, user, false, "Usuario eliminado correctamente"))

	} catch (error: any) {
		console.log(error.message)
		return res.send(customResponse(500, [], true, "No se pudo eliminar el usuario."))
	}
}

