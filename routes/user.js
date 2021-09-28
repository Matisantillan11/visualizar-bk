const { Router, response, request } = require('express')

const router = Router()

router.get('/', (req = request, res = response) => {
	res.json({
		status: 200,
		message: 'GET - Users',
	})
})

router.post('/', (req = request, res = response) => {
	res.json({
		status: 201,
		message: 'POST - Users',
	})
})

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
