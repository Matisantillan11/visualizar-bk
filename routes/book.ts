import { Router } from 'express'
import { check } from 'express-validator'
import { postBook, getBook, updateImage } from '../controllers/book'
import validateEntries from '../middlewares/validateEntries';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router()


/**
 * @swagger
 * /api/books:
 *   get:
 *     description: Endpoint creado para recibir un listado de libros o uno específico.
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: 'https://api-visualizar.herokuapp.com/api/books?id=619acc8faff19f04644a445f'
 *       - name: id
 *         description: id del libro a buscar.
 *         in: json
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Obtendrás un listado de libros
 */
router.get('/', [isAuthenticated] ,getBook)

router.post(
	'/',
	[
		isAuthenticated,
		check('name', ' You need to provide book name').notEmpty(),
		check('author', 'You need to provide the author of the book').notEmpty(),
		check(
			'editorial',
			'You need to provide the name of the editorial',
		).notEmpty(),
		check('teacher', 'You need to provide the teacher').notEmpty(),
		validateEntries
	],
	postBook,
)

router.put('/image/:id', [isAuthenticated], updateImage)

router.delete('/:id', [isAuthenticated], () => {})

export default router
