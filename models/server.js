const express = require('express')
const cors = require('cors')
const user = require('../routes/user')
const { connectToDatabase } = require('../database/config')
class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3001
		this.userRoute = '/api/users'

		this.middlewares()

		this.routes()

		this.database()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
	}

	async database() {
		await connectToDatabase()
	}

	routes() {
		this.app.use(this.userRoute, user)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
		})
	}
}

module.exports = Server
