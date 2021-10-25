const { request, response } = require('express')
const firebase = require('firebase-admin')

const getBook = async (req = request, res = response) => {
	try {
		const db = firebase.database()
		const storageRef = firebase.storage().bucket(process.env.STORAGE_BUCKET)
		let bookRef
		const idBook = req.query.id
		let books = []

		if (idBook) {
			bookRef = db.ref(`books/${idBook}`)
			bookRef.on('value', (snapshot) => {
				const { name, editorial, course, teacher, author, active } =
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
				snapshot.forEach(async (childSnapshot) => {
					const { name, editorial, course, teacher, cover, author, active } =
						childSnapshot.val()

					let id = childSnapshot.key

					books.push({
						id,
						name,
						editorial,
						course,
						teacher,
						author,
						cover: url.toString('base64'),
						active,
					})
				})
			})
			return res.status(200).json({ books })
		}
	} catch (error) {
		return res.status(500).json(error.message)
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
			cover: cover.name,
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
