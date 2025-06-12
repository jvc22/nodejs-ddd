import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { createLink } from 'test/utils/create-link'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Edit Link (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a link', async () => {
    const { token } = await createAndAuthenticateSharer(app)
    const { link } = await createLink(app, token)

    const response = await request(app.server)
      .put(`/links/${link.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        newTitle: 'New title',
      })

    expect(response.statusCode).toBe(200)
  })

  it('should not edit a link with wrong id', async () => {
    const { token } = await createAndAuthenticateSharer(app)

    const response = await request(app.server)
      .put(`/links/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        newTitle: 'New title',
      })

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })

  it('should not edit a link from another sharer', async () => {
    const { token: firstUserToken } = await createAndAuthenticateSharer(app)
    const { link } = await createLink(app, firstUserToken)

    const { token: secondUserToken } = await createAndAuthenticateSharer(app)

    const response = await request(app.server)
      .put(`/links/${link.id}`)
      .set('Authorization', `Bearer ${secondUserToken}`)
      .send({
        newTitle: 'New title',
      })

    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
