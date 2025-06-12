import { faker } from '@faker-js/faker'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createLink(app: FastifyInstance, token: string) {
  const title = faker.company.name()
  const url = faker.internet.url()

  const response = await request(app.server)
    .post('/links')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title,
      url,
    })

  return {
    link: response.body.link,
  }
}
