const { request, response } = require('express')
const bcrypt = require('bcrypt')
const firebase = require('firebase-admin')

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

		res.status(200).send(user)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

module.exports = { postUser }
