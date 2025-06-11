import { app } from '@/infra/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate a sharer', async () => {
    const email = 'johndoe@example.com'
    const password = '12345678'

    await request(app.server).post('/sign-up').send({
      name: 'John Doe',
      email,
      password,
    })

    const response = await request(app.server).post('/sign-in').send({
      email,
      password,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      token: expect.any(String),
    })
  })

  it('should not authenticate a sharer with wrong e-mail', async () => {
    const response = await request(app.server).post('/sign-in').send({
      email: 'non-existing-email@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })

  it('should not authenticate a sharer with wrong password', async () => {
    const response = await request(app.server).post('/sign-in').send({
      email: 'johndoe@example.com',
      password: '123456789',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
