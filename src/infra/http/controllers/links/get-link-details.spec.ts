import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { createLink } from 'test/utils/create-link'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Link Details (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a link details', async () => {
    const { token } = await createAndAuthenticateSharer(app)
    const { link } = await createLink(app, token)

    const response = await request(app.server)
      .get(`/links/${link.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('link')
  })

  it('should not get a link details with wrong id', async () => {
    const { token } = await createAndAuthenticateSharer(app)

    const response = await request(app.server)
      .get(`/links/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
