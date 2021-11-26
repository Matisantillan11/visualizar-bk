import { Router } from 'express'
import { check } from 'express-validator'
import { postBook, getBook, updateImage } from '../controllers/book'
import validateEntries from '../middlewares/validateEntries';

const router = Router()

router.get('/', getBook)

router.post(
	'/',
	[
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

router.put('/image/:id', updateImage)

router.delete('/:id', () => {})

export default router
