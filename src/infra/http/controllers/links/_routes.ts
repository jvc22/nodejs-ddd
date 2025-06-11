import type { FastifyInstance } from 'fastify'
import { registerLink } from './register-link'

export async function linksRoutes(app: FastifyInstance) {
  registerLink(app, {})
}
