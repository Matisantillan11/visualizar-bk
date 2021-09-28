const { Schema, model } = require('mongoose')

const userSchema = Schema({
	fullname: {
		type: String,
		require: [true, 'fullname is required'],
	},
	dni: {
		type: Number,
		require: [true, 'dni is required'],
		unique: true,
	},
	role: {
		type: String,
		require: [true, 'role is required'],
		enum: ['PROFESOR', 'ALUMNO'],
	},
	school: {
		type: String,
		require: false,
		default: 'Instituto Carlos Pellegrini',
	},
	email: {
		type: String,
		require: [true, 'email is required'],
	},
	phone_number: {
		type: Number,
		require: false,
	},
	address: {
		type: String,
		require: false,
	},
})

module.exports = model('User', userSchema)
