import { Request, Response } from 'express'
import { customResponse } from '../helpers/customResponse';
import Book from '../models/Book/book'
import config from '../config'

const cloudinary = require('cloudinary').v2
cloudinary.config({ 
  cloud_name: 'dj9mg8pvk', 
  api_key: config.CLOUDINARY_API_KEY, 
  api_secret: config.CLOUDINARY_API_SECRET,
	secure: true
});



export const getBook = async (req:Request, res: Response) => {
		
	try {
	const idUBook = req.query.id
	let book

	if (idUBook) {
		book = await Book.find({ _id: idUBook, active: true })
	} else {
		book = await Book.find({ active: true })
	}

	return res.send(customResponse(200, book , false, 'Listado de libros'))

	} catch (error: any) {
		console.error(error.message)
		return res.status(500).json({ message: "No se pudieron obtener los libros"})
	}
	
}

export const postBook = async (req:Request, res: Response) => {

	try {
		const { name, editorial, course, teacher, author } = req.body
		
		if(!req.files || Object.keys(req.files).length === 0){
			return res.send(customResponse(500, [], true, 'No se encontraron archivos para subir. Por favor, asegurate de haber elegido una imagen para la portada de tu libro'))
		}

		const  tempFilePath  = req.files.cover
		const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
		console.log("File uploaded") 
		
		const book = new Book({ name, editorial, course, teacher, author, cover: secure_url })
		await book.save()

		return res.send(customResponse(201, book , false, 'Libro creado correctamente'))

	} catch (error) {
		console.error(error)
		return res.send(customResponse(500, [], true, 'No se pudo crear el libro.'))
	}
	
}


export const updateImage = async (req:Request, res: Response) => {
	const { id } = req.params

	if(!req.files || Object.keys(req.files).length === 0){
		return res.send(customResponse(500, [], true, 'No se encontraron archivos para subir. Por favor, asegurate de haber elegido una imagen para la portada de tu libro'))
	}

	try {
		const book = await Book.findById(id)
		
		if(book){
			if(book.cover){

				const url: string[] = book.cover.split('/') 
				const [ publicUrl ]: any = url?.pop()?.split(".")

				cloudinary.uploader.destroy(publicUrl);
			}

			const file: any = req.files.cover
			const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath)
			console.log("File uploaded")
			
			book.cover = secure_url

			await Book.updateOne({_id: id}, book )

			return res.send(customResponse(201, book , false, 'Portada actualizada correctamente'))
			
		}else{
			return res.send(customResponse(404, [], true, 'No se encontró libro.'))
		}
	} catch (error) {
		console.log(error)
		return res.send(customResponse(500, [], true, 'No se pudo actualizar la portada del libro.'))
	}
} 


