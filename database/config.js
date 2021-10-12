const firebaseAdmin = require('firebase-admin')

const defaultApp = require('../visualizar-app-firebase-adminsdk.json')

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.applicationDefault(defaultApp),
	databaseURL: process.env.DB_URL,
})

const connectToDatabase = async () => {
	try {
		await firebaseAdmin.database()
		console.log(`Connected successfully to the database`)
	} catch (error) {
		console.error('An error was detected connecting to database: ' + error)
		throw new Error('Error connecting to the database')
	}
}

module.exports = { connectToDatabase }
