import { app } from '@/infra/app'
import request from 'supertest'
import { createAndAuthenticateSharer } from 'test/utils/create-and-authenticate-sharer'
import { createLink } from 'test/utils/create-link'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a sharer metrics', async () => {
    const { token } = await createAndAuthenticateSharer(app)
    await createLink(app, token)

    const response = await request(app.server)
      .get('/sharers/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('metrics')
    expect(response.body.metrics.totalCount).toBe(1)
  })
})
