const { Schema, model } = require('mongoose')

const bookSchema = Schema({
	name: {
		type: String,
		require: [true, 'name of book is required'],
	},
	editorial: {
		type: String,
		require: [true, 'editorial is required'],
	},
	course: {
		type: String,
		require: [true, 'course is required']
	
	},
	teacher: {
		type: String,
		require: [true, 'teacher is required'],
	},
	author: {
		type: String,
		require: [true, 'author is required'],
	},
	cover: {
        type: String,
		require: [true, 'cover is required'],
	},
	active:{
		type: Boolean,
		require: false,
		default: true
	},
})

bookSchema.methods.toJSON = function(){
	const { __v, ...book } = this.toObject()
	return book
}

module.exports = model('Book', bookSchema)
