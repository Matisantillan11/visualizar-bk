const { request, response } = require('express')
const path = require('path')
const Book = require('../models/book')
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

		const { cover } = req.files

		const uploadPath = path.join(__dirname, "../uploads/", cover.name )

		cover.mv(uploadPath, (error) => {
			if(error){
				console.log(error)
				return res.status(500).send('No se pudo crear el libro.')
			}

			console.log('File uploaded to: ' + uploadPath)
		})

		const book = new Book({ name, editorial, course, teacher, author, cover: cover.name })
		await book.save()

		res.status(201).json({ message: "Book created successfully", book})

	} catch (error) {
		console.error(error)
		return res.status(500).send('No se pudo crear el libro.')
	}
	
}

module.exports = { getBook, postBook }
