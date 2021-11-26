import mongoose from 'mongoose'

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_URL || '')
		console.log(`Connected successfully to the database`)
	} catch (error) {
		console.error('An error was detected connecting to database: ' + error)
		throw new Error('Error connecting to the database')
	}
}

