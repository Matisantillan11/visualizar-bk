const { Router, response, request } = require('express')
const { check } = require('express-validator')
const { loginUser, validateUser } = require('../controllers/auth')

const validateEntries = require('../middlewares/validateEntries')

const router = Router()

router.post(
	'/login',
	[
		check('email', 'You need to provide your email').isEmail(),
		check('password', 'You must to provide a password').isString().notEmpty(),
		validateEntries,
	],
	loginUser,
)

router.post('/validate', validateUser)

module.exports = router
