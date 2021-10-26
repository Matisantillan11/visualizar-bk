const { request, response } = require('express')
const firebase = require('firebase-admin')

const getBook = async (req = request, res = response) => {
	try {
		const db = firebase.database()
		let bookRef
		const idBook = req.query.id
		let books = []
		if (idBook) {
			bookRef = db.ref(`books/${idBook}`)
			bookRef.on('value', (snapshot) => {
				const { name, editorial, course, teacher, author, cover, active } =
					snapshot.val()
				const id = snapshot.key

				let completeBook = {
					id,
					name,
					editorial,
					course,
					teacher,
					author,
					cover,
					active,
				}
				return res.status(200).json({ book: completeBook })
			})
		} else {
			bookRef = await db.ref(`books`)
			bookRef.on('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const { name, editorial, course, teacher, author, cover, active } =
						childSnapshot.val()

					let id = childSnapshot.key

					books.push({ id, name, editorial, course, teacher, author, cover,  active })
				})

				return res.status(200).json({ books })
			})
		}
	} catch (error) {
		console.log(error)
		throw new Error("No se pudieron obtener los libros")
	}
}

const postBook = async (req = request, res = response) => {
	try {
		const bookRef = firebase.database().ref().child('books')
		const storageRef = firebase.storage().bucket(process.env.STORAGE_BUCKET)
		const { name, editorial, course, teacher, author } = req.body
		const { cover } = req.files

		const uploadResponse = await storageRef.upload(cover.tempFilePath, {
			destination: `files/books/${cover.name}`,
		})

		let book = {
			name,
			editorial,
			course,
			teacher,
			author,
			cover: uploadResponse[0].metadata.name,
			active: true,
		}

		bookRef.push(book)

		return res.status(201).send(book)
	} catch (error) {
		console.error(error)
		return res.status(500).send('No se pudo crear el libro.')
	}
}

module.exports = { getBook, postBook }
