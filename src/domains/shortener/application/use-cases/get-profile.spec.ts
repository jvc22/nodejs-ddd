import { makeSharer } from 'test/factories/make-sharer'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetProfileUseCase } from './get-profile'

let sharersRepository: InMemorySharersRepository
let sut: GetProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    sut = new GetProfileUseCase(sharersRepository)
  })

  it('should retrieve profile data', async () => {
    const { sharer: createdSharer } = await makeSharer()
    await sharersRepository.create(createdSharer)

    const result = await sut.execute({
      sharerId: createdSharer.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.sharer).toEqual(createdSharer)
    }
  })

  it('should not retrieve profile data with wrong id', async () => {
    const result = await sut.execute({ sharerId: 'non-existing-id' })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
