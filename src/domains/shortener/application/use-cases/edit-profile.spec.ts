import { faker } from '@faker-js/faker'
import { makeSharer } from 'test/factories/make-sharer'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditProfileUseCase } from './edit-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sharersRepository: InMemorySharersRepository
let sut: EditProfileUseCase

describe('Edit Profile Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    sut = new EditProfileUseCase(sharersRepository)
  })

  it('should edit a profile', async () => {
    const newName = faker.person.fullName()

    const { sharer: createdSharer } = await makeSharer()
    await sharersRepository.create(createdSharer)

    const result = await sut.execute({
      sharerId: createdSharer.id.toString(),
      newName,
    })

    expect(result.isSuccess()).toBe(true)
  })

  it('should not edit a profile with wrong id', async () => {
    const result = await sut.execute({
      sharerId: 'non-existing-id',
      newName: 'New title',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
