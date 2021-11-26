import { Router, response, request } from 'express'
import { check } from 'express-validator'
import {
	postUser,
	getUser,
	putUser,
/* 	updateImage, */
	deleteUser,
} from '../controllers/user'
import validateEntries from '../middlewares/validateEntries'

const router = Router()

router.get('/', getUser)

router.post(
	'/',
	[
		check('fullname', 'You need to provide your fullname').isString(),
		check('dni', 'You need to provide a valid DNI')
			.isNumeric()
			.isLength({ min: 7, max: 10 }),
		check('email', 'You need to provide your email').isEmail(),
		check('password', 'You must to provide a password').isString().notEmpty(),
		check(
			'password',
			'You password must contain between 8 and 12 characters',
		).isLength({ min: 8, max: 12 }),
		check('school').default('Instituto Carlos Pellegrini'),
		validateEntries,
	],
	postUser,
)

router.put('/:id', putUser)
/* router.put('/image/:id', updateImage) */
router.delete('/:id', deleteUser)

export default router
