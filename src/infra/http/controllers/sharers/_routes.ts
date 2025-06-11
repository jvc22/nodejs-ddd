import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { createAccount } from './create-account'
import { editProfile } from './edit-profile'

export async function sharersRoutes(app: FastifyInstance) {
  createAccount(app, {})
  authenticate(app, {})
  editProfile(app, {})
}
