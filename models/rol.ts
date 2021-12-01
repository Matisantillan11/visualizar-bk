const { Schema, model } = require('mongoose')

const rolSchema = Schema({
	name: {
		type: String,
		require: [true, 'fullname is required'],
	},
  active:{
    type: Boolean,
    require: false,
    default: true
  }
	
})

rolSchema.methods.toJSON = function(){
	const { __v, ...rol } = this.toObject()
	return rol
}

export default model('Rol', rolSchema)
