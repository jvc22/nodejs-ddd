import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { createLink } from 'test/utils/create-link'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Access Link (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should access a link', async () => {
    const { token } = await createAndAuthenticateSharer(app)
    const { link } = await createLink(app, token)

    const response = await request(app.server).get(`/${link.code}`).send()

    expect(response.statusCode).toBe(302)
    expect(response.redirect).toBe(true)
  })

  it('should not access a link with wrong code', async () => {
    const response = await request(app.server)
      .get(`/${faker.string.ulid()}`)
      .send()

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
