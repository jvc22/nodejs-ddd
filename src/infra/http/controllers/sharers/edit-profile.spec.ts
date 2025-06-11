import { app } from '@/infra/app'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Edit Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a sharer profile', async () => {
    const { token } = await createAndAuthenticateSharer(app)

    const response = await request(app.server)
      .get('/sharers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        newName: 'John Doe',
      })

    expect(response.statusCode).toBe(200)
  })
})
