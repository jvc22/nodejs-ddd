import { makeSharer } from 'test/factories/make-sharer'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAccountUseCase } from './create-account'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let sharersRepository: InMemorySharersRepository
let sut: CreateAccountUseCase

describe('Create Account Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    sut = new CreateAccountUseCase(sharersRepository)
  })

  it('should create an account', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    const result = await sut.execute({
      name: 'John Doe',
      email,
      password,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toMatchObject({
      sharer: expect.objectContaining({
        email,
      }),
    })

    if (result.isSuccess()) {
      expect(sharersRepository.items[0]).toEqual(result.value.sharer)

      await expect(
        result.value.sharer.passwordHash.compare(password)
      ).resolves.toBe(true)
    }
  })

  it('should not create an account with same e-mail twice', async () => {
    const { sharer } = await makeSharer()
    await sharersRepository.create(sharer)

    const result = await sut.execute({
      name: 'Jane Doe',
      email: sharer.email,
      password: '123456',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
