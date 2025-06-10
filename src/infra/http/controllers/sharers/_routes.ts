import type { FastifyInstance } from 'fastify'
import { createAccount } from './create-account'

export async function sharersRoutes(app: FastifyInstance) {
  createAccount(app, {})
}
