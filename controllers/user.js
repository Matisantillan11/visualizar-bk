const { request, response } = require('express')
const bcrypt = require('bcrypt')
const firebase = require('firebase-admin')
const User = require('../models/user')
const { findById } = require('../models/user')


const getUser = async (req = request, res = response) => {
	try {
		const idUser = req.query.id
		let user

		if (idUser) {
			user = await User.findById(idUser)	
		} else {
			user = await User.find()
			
		}
	
		return res.status(200).json({ users: user })
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

const postUser = async (req = request, res = response) => {
	try {
		const { fullname, dni, role, email, password, school } = req.body
		const salt = 10
		const hashedPassword = await bcrypt.hash(password, salt)
		
		const user = new User ({
			fullname,
			dni,
			role,
			email,
			school,
			active: false,
			password: hashedPassword,
		})

		await user.save()
		delete user.password

		return res.status(201).send(user)
	} catch (error) {
		console.error(error.message)
		return res.status(500).json("No se pudo crear el usuario.")
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

		
		await User.updateOne({ _id: idUser }, user)

		return res.status(200).json({
			message: 'User updated successfully',
			user
		})
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const deleteUser = async (req = request, res = response) => {
	const idUser = req.params.id
	const user = {
		active: false
	}

	try {
		await User.updateOne({ _id: idUser }, user)
		return res.status(200).json({ message: 'User deleted successfully' })

	} catch (error) {
		res.status(500).json(error.message)
	}
}

module.exports = { getUser, postUser, putUser, deleteUser }
