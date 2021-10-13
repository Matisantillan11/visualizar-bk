const { request, response } = require('express')

const firebase = require('firebase-admin')

const postUser = async (req = request, res = response) => {
	const userRef = firebase.database().ref().child('users')
	const { fullname, dni, role, email } = req.body
	const user = { fullname, dni, role, email }

	await userRef.push({ user })

	res.status(200).send(user)
}

module.exports = { postUser }
