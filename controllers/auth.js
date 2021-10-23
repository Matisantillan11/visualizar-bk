const { compare, compareSync } = require('bcrypt')
const { response, request } = require('express')
const firebase = require('firebase-admin')
const generateJWT = require('../helpers/generateJWT')

const loginUser = async (req = request, res = response) => {
	try {
		let user = req.body

		const userResponse = await firebase.database().ref(`users`)
		userResponse.on('value', async (snapshot) => {
			let canLogin = false
			let id = 0
			snapshot.forEach((childSnapshot) => {
				let { email, password, active } = childSnapshot.val()

				//email existe
				if (user.email === email) {
					//validacion de contraseña
					const correctPassword = compareSync(user.password, password)
					//usuario activo
					if (correctPassword && active) {
						canLogin = true
						id = childSnapshot.key
						user = childSnapshot.val()
					}
				}
			})

			if (canLogin === false) {
				return res.status(400).json({ message: 'Wrong credentials!!' })
			} else {
				//generar jwt
				delete user.password
				const token = await generateJWT(id)
				return res.status(200).json({ token, user, msg: 'Logged successfully' })
			}
		})
	} catch (error) {
		console.error({ error })
		return res.json({
			message: "We can't validate your credentials.",
		})
	}
}

module.exports = { loginUser }
