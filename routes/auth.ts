import { Router } from 'express'
import { check } from 'express-validator'
import {loginUser, validateUser} from '../controllers/auth'

import validateEntries from '../middlewares/validateEntries'

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

export default router
