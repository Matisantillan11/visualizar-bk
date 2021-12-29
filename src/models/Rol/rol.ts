import { Schema, model } from 'mongoose'
import Rol from './interface'

export const modelRol = {
	name: {
		type: String,
		typed: 'string',
		require: [true, 'fullname is required'],
	},
  active:{
    type: Boolean,
		typed: 'boolean',
    require: false,
  },
}

const rolSchema = new Schema<Rol>(modelRol)

export default model<Rol>('Rol', rolSchema)

rolSchema.methods.toJSON = function(){
	const { __v, ...rol } = this.toObject()
	return rol
}


