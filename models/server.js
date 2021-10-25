const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const user = require('../routes/user')
const auth = require('../routes/auth')
const book = require('../routes/book')
const { connectToDatabase } = require('../database/config')
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3001
		this.userRoute = '/api/users'
		this.authRoute = '/api/auth'
		this.bookRoute = '/api/books'

		this.middlewares()

		this.routes()

		this.database()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
			}),
		)
	}

	async database() {
		await connectToDatabase()
	}

	routes() {
		this.app.use(this.userRoute, user)
		this.app.use(this.authRoute, auth)
		this.app.use(this.bookRoute, book)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
		})
	}
}

module.exports = Server
