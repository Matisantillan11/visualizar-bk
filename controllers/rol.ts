import { Request, Response } from 'express'
import { customResponse } from '../helpers/customResponse';
import Rol from '../models/rol'

export const getRol = async (req: Request, res: Response) => {
	try {
		const idRol = req.query.id
		let rol

		if (idRol) {
			rol = await Rol.findById(idRol)	
		} else {
			rol = await Rol.find()
			
		}
	
		return res.status(200).json({ rols: rol })
	} catch (error: any) {
		return res.status(500).json(error.message)
	}
}

export const postRol = async (req: Request, res: Response) => {
	try {
		let { name } = req.body
	
		name = name.toUpperCase()

		const rol = new Rol ({
			name,
			active: true,
		
		})

		const role = await rol.save()

		return res.send(customResponse(200, {rol: role}, false, 'Creado correactamente'))
	} catch (error: any) {
		res.send(customResponse(500, {}, true, error.message))
	}
}

export const putRol = async (req: Request, res: Response) => {
	const idRol = req.params.id
	let { name, active } = req.body

	name = name.toUpperCase()
	const rol = {
		name,
		active
	}

	try {
		
		await Rol.updateOne({ _id: idRol }, rol)

		return res.send(customResponse(200, { rol }, false, 'actualizado correctamente'))
	} catch (error: any) {
		res.send(customResponse(500, {}, true, error.message))
	}
}


export const deleteRol = async (req: Request, res: Response) => {
	const idRol = req.params.id
	const rol = {
		active: false
	}

	try {
		await Rol.updateOne({ _id: idRol }, rol)
		return res.send(customResponse(200, {rol }, false, 'Borrado exitosamente'))

	} catch (error: any) {
		res.send(customResponse(500, {}, true, error.message))
	}
}

