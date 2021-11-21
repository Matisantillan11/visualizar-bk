const { Router, response, request } = require('express')
const { check } = require('express-validator')
const { postBook, getBook, updateImage } = require('../controllers/book')
const validateEntries = require('../middlewares/validateEntries')

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
	],
	postBook,
)

router.put('/image/:id', updateImage)

router.delete('/:id', () => {})

module.exports = router
