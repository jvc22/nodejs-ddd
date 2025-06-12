import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { createAccount } from './create-account'
import { editProfile } from './edit-profile'
import { getMetrics } from './get-metrics'
import { getProfile } from './get-profile'

export async function sharersRoutes(app: FastifyInstance) {
  createAccount(app, {})
  authenticate(app, {})
  getProfile(app, {})
  editProfile(app, {})
  getMetrics(app, {})
}
