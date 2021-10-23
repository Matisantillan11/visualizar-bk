const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
	return new Promise((resolve, reject) => {
		const payload = { uid }
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: '7d',
			},
			(err, token) => {
				if (err) {
					console.error(err)
					reject("We can't generate the Token")
				} else {
					resolve(token)
				}
			},
		)
	})
}

module.exports = generateJWT
