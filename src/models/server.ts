import express, { Application } from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import swaggerOptions from '../../swagger'
import auth from '../routes/auth'
import user from '../routes/user'
import book from '../routes/book'
import rol from '../routes/rol'
import { connectToDatabase } from '../database/config'
export default class Server {
	private app: Application
	private port: string 
	private userRoute: string
	private authRoute: string
	private bookRoute: string
	private rolRoute: string
	private swaggerRoute: string

	constructor() {
		this.app = express()
		this.port = process.env.PORT || '3001'
		this.userRoute = '/api/users'
		this.authRoute = '/api/auth'
		this.bookRoute = '/api/books'
		this.rolRoute = '/api/rol'
		this.swaggerRoute = '/api/docs'

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
		const swaggerDocs = swaggerJsDoc(swaggerOptions.swaggerOptions)

		this.app.use(this.authRoute, auth)
		this.app.use(this.userRoute, user)
		this.app.use(this.bookRoute, book)
		this.app.use(this.rolRoute, rol)
		this.app.use(this.swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerDocs))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
		})
	}
}

