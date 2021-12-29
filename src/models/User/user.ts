import { Schema, model } from 'mongoose'
import User from "./interface"

export const modelUser = {
	fullname: {
		type: String,
		typed: 'string',
		require: [true, 'fullname is required'],
	},
	dni: {
		type: Number,
		typed: 'number',
		require: [true, 'dni is required'],
		unique: true,
	},
	role: {
		type: String,
		typed: 'string',
		require: [true, 'role is required'],
		enum: ['PROFESOR', 'ALUMNO'],
	},
	school: {
		type: String,
		typed: 'string',
		require: false,
		default: 'Instituto Carlos Pellegrini',
	},
	email: {
		type: String,
		typed: 'string',
		require: [true, 'email is required'],
		unique: true
	},
	phone_number: {
		type: Number,
		typed: 'number',
		require: false,
	},
	address: {
		type: String,
		typed: 'string',
		require: false,
	},
	active:{
		type: Boolean,
		typed: 'boolean',
		require: false,
		default: true
	},
	password:{
		type:String,
		typed: 'string',
		require: [ true, 'password is required']
	},
	profileImage: {
		type: String,
		typed: 'string',
		require: false
	}
}
const userSchema = new Schema<User>(modelUser)

userSchema.methods.toJSON = function(){
	const { __v, password, ...user } = this.toObject()
	return user
}

export default model<User>('User', userSchema)
