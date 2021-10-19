const { request, response } = require('express')
const bcrypt = require('bcrypt')
const firebase = require('firebase-admin')

const getUser = async (req = request, res = response) => {
	try {
		const db = firebase.database()
		let userRef
		const idUser = req.query.id
		let user = []
		if (idUser) {
			userRef = db.ref(`users/${idUser}`)
			userRef.on('value', (snapshot) => {
				const { dni, email, fullname, role, school } = snapshot.val()
				const id = snapshot.key

				let completeUser = { id, dni, email, fullname, role, school }
				res.status(200).json({ user: completeUser })
			})
		} else {
			userRef = await db.ref(`users`)
			userRef.on('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					let { dni, email, fullname, role, school, active } =
						childSnapshot.val()
					let id = childSnapshot.key

					user.push({ id, dni, email, fullname, role, school })
				})

				res.status(200).json({ users: user })
			})
		}
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const postUser = async (req = request, res = response) => {
	try {
		const userRef = firebase.database().ref().child('users')
		const { fullname, dni, role, email, password, school } = req.body
		const salt = 10
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = {
			fullname,
			dni,
			role,
			email,
			school,
			active: false,
			password: hashedPassword,
		}

		await userRef.push(user)
		delete user.password

		res.status(201).send(user)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const putUser = async (req = request, res = response, next = next) => {
	const idUser = req.params.id
	const { fullname, dni, email } = req.body
	const user = {
		fullname,
		dni,
		email,
	}

	try {
		const userResponse = firebase.database().ref(`users/${idUser}`)
		userResponse.once('value', (snapshot) => {
			if (snapshot.val() !== null) {
				userResponse.update(user)
				res.status(200).json(user)
			} else {
				res.status(404).end()
			}
		})
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const deleteUser = (req = request, res = response) => {
	const idUser = req.params.id

	try {
		const userResponse = firebase.database().ref(`users/${idUser}`)
		userResponse.once('value', (snapshot) => {
			if (snapshot.val() !== null) {
				userResponse.remove()
				res.status(200).json({ message: 'User deleted successfully' })
			} else {
				res.status(404).end()
			}
		})
	} catch (error) {
		res.status(500).json(error.message)
	}
}

module.exports = { getUser, postUser, putUser, deleteUser }
