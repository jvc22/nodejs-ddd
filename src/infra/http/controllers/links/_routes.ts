import type { FastifyInstance } from 'fastify'
import { editLink } from './edit-link'
import { fetchRecentLinks } from './fetch-recent-links'
import { getLinkDetails } from './get-link-details'
import { registerLink } from './register-link'

export async function linksRoutes(app: FastifyInstance) {
  registerLink(app, {})
  getLinkDetails(app, {})
  fetchRecentLinks(app, {})
  editLink(app, {})
}
