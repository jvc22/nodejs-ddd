import type { FastifyInstance } from 'fastify'
import { getLinkDetails } from './get-link-details'
import { registerLink } from './register-link'

export async function linksRoutes(app: FastifyInstance) {
  registerLink(app, {})
  getLinkDetails(app, {})
}
