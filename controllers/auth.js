const { compare } = require('bcrypt')
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const generateJWT = require('../helpers/generateJWT')
const User = require('../models/user')

const loginUser = async (req = request, res = response) => {
	try {
		let { email, password } = req.body


		const user = await User.findOne({ email })

		if(user){
			const correctPassword = await compare( password, user.password)
			if(correctPassword){
				if(user.active){
					canLogin = true
					const token = await generateJWT(user._id)
					delete user.password
					return res.status(200).json({ user, token, msg: 'Logged successfully' })
				}else{
					return res.status(401).json({
						code: 401,
						message: 'Your account is not active. Please contact your admin.'
					})
				}
				
			} else{
				return res.status(401).json({
					code: 401,
					message: 'Cannot validate your credentials. Please try again'
				})
			}
		} else {
			return res.status(401).json({
				code: 401,
				message: 'Cannot validate your credentials. Please try again'
			})
		}

		
	} catch (error) {
		console.error({ error })
		return res.json({
			message: "We can't validate your credentials.",
		})
	}

}

const validateUser = async (req = request, res = response) => {
	const token = req.header('x-token')
	if(!token){
		return res.status(401).json({
			message: 'Token not provided'
		})
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
		
		const user = await User.findById(uid)

		if(!user){
			return res.status(401).json({ message: 'User not found'})
		}

		if(!user.active){
			return res.status(401).json({ message:  'Invalid token'})
		}
	
		return res.status(202).json(user)
	} catch (error) {

		console.log({ error })
		return res.status(401).json({
			message: 'Invalid token'
		})

	}
}
module.exports = { loginUser, validateUser }
