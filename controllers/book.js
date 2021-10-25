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
					active,
				}
				return res.status(200).json({ book: completeBook })
			})
		} else {
			bookRef = await db.ref(`books`)
			bookRef.on('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const { name, editorial, course, teacher, author, active } =
						childSnapshot.val()

					let id = childSnapshot.key

					books.push({ id, name, editorial, course, teacher, author, active })
				})

				return res.status(200).json({ books })
			})
		}
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

const postBook = async (req = request, res = response) => {
	try {
		const bookRef = firebase.database().ref().child('books')
		const { name, editorial, course, teacher, author } = req.body
		const { cover } = req.files

		const storageRef = firebase.storage().bucket(process.env.STORAGE_BUCKET)
		storageRef
			.upload(cover.tempFilePath, {
				destination: `/files/books/${cover.name}`,
			})
			.then((file) => {
				let book = {
					name,
					editorial,
					course,
					teacher,
					author,
					cover: file[0].metadata.name,
					active: true,
				}

				bookRef.push(book)

				return res.status(201).send(book)
			})
			.catch((error) => {
				return res.status(500).json(error.message)
			})
	} catch (error) {}
}

module.exports = { getBook, postBook }
