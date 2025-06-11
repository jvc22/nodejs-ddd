import { faker } from '@faker-js/faker'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateSharer(app: FastifyInstance) {
  const name = faker.person.fullName()
  const email = faker.internet.email()
  const password = faker.internet.password()

  await request(app.server).post('/sign-up').send({
    name,
    email,
    password,
  })

  const response = await request(app.server).post('/sign-in').send({
    email,
    password,
  })

  const { token } = response.body

  return {
    token,
    data: {
      name,
      email,
      password,
    },
  }
}
