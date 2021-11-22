const { request, response } = require('express')
const path = require('path')
const Book = require('../models/book')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)


const getBook = async (req = request, res = response) => {
		
	try {
	const idUBook = req.query.id
	let book

	if (idUBook) {
		book = await Book.findById(idUBook)	
	} else {
		book = await Book.find()
		
	}

	return res.status(200).json({ books: book })
	} catch (error) {
		console.error(error.message)
		return res.status(500).json({ message: "No se pudieron obtener los libros"})
	}
	
}

const postBook = async (req = request, res = response) => {

	try {
		const { name, editorial, course, teacher, author } = req.body
		
		if(!req.files || Object.keys(req.files).length === 0){
			return res.status(500).send('No se encontraron archivos para subir. Por favor, asegurate de haber elegido una imagen para tu libro')
		}

		const { tempFilePath } = req.files.cover
		const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
		console.log("File uploaded") 
		
		const book = new Book({ name, editorial, course, teacher, author, cover: secure_url })
		await book.save()

		res.status(201).json({ message: "Book created successfully", book})

	} catch (error) {
		console.error(error)
		return res.status(500).send('No se pudo crear el libro.')
	}
	
}


const updateImage = async (req = request, res = response) => {
	const { id } = req.params

	if(!req.files || Object.keys(req.files).length === 0){
		return res.status(500).send('No se encontraron archivos para subir. Por favor, asegurate de haber elegido una imagen para tu libro')
	}

	try {
		const book = await Book.findById(id)
		if(book){
	
			if(book.cover){

				const url = book.cover.split('/')
				const [ publicUrl ] = url.pop().split(".");

				cloudinary.uploader.destroy(publicUrl);
			}

			const { tempFilePath } = req.files.cover
			const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
			console.log("File uploaded")
			
			book.cover = secure_url

			await Book.updateOne({_id: id}, book )

			return res.status(200).json({ message: "Libro actualizado correctamente", book})
			
		}else{
			return res.status(400).json({message: 'No se pudo actualizar el libro'})
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = { getBook, postBook, updateImage }
