const { Router, response, request } = require('express')
const { postUser } = require('../controllers/user')

const router = Router()

router.get('/', (req = request, res = response) => {
	res.json({
		status: 200,
		message: 'GET - Users',
	})
})

router.post('/', postUser)

router.put('/', (req = request, res = response) => {
	res.json({
		status: 200,
		message: 'PUT - Users',
	})
})

router.delete('/', (req = request, res = response) => {
	res.json({
		status: 200,
		message: 'DELETE - Users',
	})
})

module.exports = router
