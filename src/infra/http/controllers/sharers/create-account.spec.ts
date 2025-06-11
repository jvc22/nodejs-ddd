import { app } from '@/infra/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Account (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new account', async () => {
    const response = await request(app.server).post('/sign-up').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toBe(201)
  })

  it('should not create a new account with same e-mail twice', async () => {
    const email = 'johndoe@example.com'

    await request(app.server).post('/sign-up').send({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    const response = await request(app.server).post('/sign-up').send({
      name: 'Jane Doe',
      email,
      password: '87654321',
    })

    expect(response.statusCode).toBe(409)
    expect(response.body).toMatchObject({
      message: expect.any(String),
    })
  })
})
