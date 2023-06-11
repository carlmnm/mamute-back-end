import { Router } from 'express'
import { createUser } from '@/controllers/users-controller'
import { createUserSchema } from '@/schemas/users-schema'
import { validateBody } from '@/middlewares/validation-middleware'

const usersRouter = Router()

usersRouter.post('/', validateBody(createUserSchema), createUser)

export {usersRouter}