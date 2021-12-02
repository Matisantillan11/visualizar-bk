import { Schema, model } from 'mongoose'
import Rol from './interface'


const rolSchema = new Schema<Rol>({
	name: {
		type: String,
		typed: 'string',
		require: [true, 'fullname is required'],
	},
  active:{
    type: Boolean,
		typed: 'boolean',
    require: false,
    default: true
  },
})

export default model<Rol>('Rol', rolSchema)

rolSchema.methods.toJSON = function(){
	const { __v, ...rol } = this.toObject()
	return rol
}


