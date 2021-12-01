import { Router, response, request } from 'express'
import { check } from 'express-validator'
import {
	postUser,
	getUser,
	putUser,
/* 	updateImage, */
	deleteUser,
} from '../controllers/user'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import validateEntries from '../middlewares/validateEntries'

const router = Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Endpoint creado para recibir un listado de usuarios o uno específico.
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: 'https://api-visualizar.herokuapp.com/api/users?id=6178a40dbb84cb3ebcb45f9a'
 *       - name: id
 *         description: id del usuario a buscar.
 *         in: json
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Obtendrás un listado de usuarios
 */
router.get('/', [isAuthenticated], getUser)

router.post(
	'/',
	[
		isAuthenticated,
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

router.put('/:id', [isAuthenticated],  putUser)
/* router.put('/image/:id', updateImage) */
router.delete('/:id', [isAuthenticated], deleteUser)

export default router
