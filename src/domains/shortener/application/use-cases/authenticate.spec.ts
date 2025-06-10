import { makeSharer } from 'test/factories/make-sharer'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sharersRepository: InMemorySharersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    sut = new AuthenticateUseCase(sharersRepository)
  })

  it('should authenticate a sharer', async () => {
    const {
      sharer: createdSharer,
      data: { password },
    } = await makeSharer()
    await sharersRepository.create(createdSharer)

    const result = await sut.execute({
      email: createdSharer.email,
      password,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.sharer).toEqual(createdSharer)
    }
  })

  it('should not authenticate a non-existing sharer', async () => {
    const result = await sut.execute({
      email: 'non-existing-email',
      password: '123456',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate a sharer with wrong password', async () => {
    const { sharer: createdSharer } = await makeSharer()
    await sharersRepository.create(createdSharer)

    const result = await sut.execute({
      email: createdSharer.email,
      password: 'non-existing-password',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
