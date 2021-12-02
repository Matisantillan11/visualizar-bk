import { Router, response, request } from 'express'
import { check } from 'express-validator'
import { deleteRol, getRol, postRol, putRol } from '../controllers/rol';
import { isAuthenticated } from '../middlewares/isAuthenticated'
import validateEntries from '../middlewares/validateEntries'

const router = Router()

/**
 * @swagger
 * /api/rol:
 *   get:
 *     description: Endpoint creado para recibir un listado de roles o uno específico.
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: 'https://api-visualizar.herokuapp.com/api/rol?id=6178a40dbb84cb3ebcb45f9a'
 *       - name: id
 *         description: id del usuario a buscar.
 *         in: json
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Obtendrás un listado de roles
 */
router.get('/', [isAuthenticated], getRol)

router.post(
	'/',
	[
		isAuthenticated,
		check('name', 'You need to provide your fullname').isString(),
		validateEntries,
	],
	postRol,
)

router.put('/:id', [
  isAuthenticated,
  check('name', 'You need to provide your fullname').isString(),
  validateEntries,
],  putRol)


router.delete('/:id', [
  isAuthenticated,
], deleteRol)

export default router
