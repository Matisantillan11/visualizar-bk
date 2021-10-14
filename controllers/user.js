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
					let { dni, email, fullname, role, school } = childSnapshot.val()
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
			password: hashedPassword,
		}

		await userRef.push(user)
		delete user.password

		res.status(201).send(user)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const putUser = async (req = request, res = response) => {
	try {
		const idUser = req.params.id
		const { fullname, dni, email } = req.body
		const user = {
			fullname,
			dni,
			email,
		}

		const userResponse = await firebase.database().ref('users').child(idUser)

		const updated = userResponse.on('value', async (snapshot) => {
			if (snapshot.val() !== null) {
				await userResponse.update(user)
				return true
			} else {
				return false
			}
		})

		console.log(updated)
		if (updated) {
			res.status(200).json(user)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json(error.message)
	}
}

module.exports = { getUser, postUser, putUser }
