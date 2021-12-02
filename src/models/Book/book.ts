import {Schema, model } from 'mongoose'
import Book from './interface'

const bookSchema = new Schema<Book>({
	name: {
		type: String,
		typed: 'string',
		require: [true, 'name of book is required'],
	},
	editorial: {
		type: String,
		typed: 'string',
		require: [true, 'editorial is required'],
	},
	course: {
		type: String,
		typed: 'string',
		require: [true, 'course is required']
	
	},
	teacher: {
		type: String,
		typed: 'string',
		require: [true, 'teacher is required'],
	},
	author: {
		type: String,
		typed: 'string',
		require: [true, 'author is required'],
	},
	cover: {
        type: String,
				typed: 'string',
		require: [true, 'cover is required'],
	},
	active:{
		type: Boolean,
		typed: 'boolean',
		require: false,
		default: true
	},
})


bookSchema.methods.toJSON = function(){
	const { __v, ...book } = this.toObject()
	return book
}

export default model<Book>('Book', bookSchema)
