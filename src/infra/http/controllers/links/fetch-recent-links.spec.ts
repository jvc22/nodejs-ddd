import { app } from '@/infra/app'
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

  it('should fetch recent links', async () => {
    const { token } = await createAndAuthenticateSharer(app)

    for (let i = 0; i < 12; i++) {
      await createLink(app, token)
    }

    const firstSectionResponse = await request(app.server)
      .get('/links?page=1')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(firstSectionResponse.statusCode).toBe(200)
    expect(firstSectionResponse.body).toHaveProperty('links')
    expect(firstSectionResponse.body.links).toHaveLength(10)

    const secondSectionResponse = await request(app.server)
      .get('/links?page=2')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(secondSectionResponse.statusCode).toBe(200)
    expect(secondSectionResponse.body).toHaveProperty('links')
    expect(secondSectionResponse.body.links).toHaveLength(2)
  })
})
