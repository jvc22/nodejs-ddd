import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Link (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register a link', async () => {
    const { token } = await createAndAuthenticateSharer(app)

    const response = await request(app.server)
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.company.name(),
        url: faker.internet.url(),
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('link')
  })
})
