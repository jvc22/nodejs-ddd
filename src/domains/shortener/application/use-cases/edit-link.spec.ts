import { faker } from '@faker-js/faker'
import { makeLink } from 'test/factories/make-link'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditLinkUseCase } from './edit-link'
import { ActionNotAllowedError } from './errors/action-not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let linksRepository: InMemoryLinksRepository
let sut: EditLinkUseCase

describe('Edit Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new EditLinkUseCase(linksRepository)
  })

  it('should edit a link', async () => {
    const newTitle = faker.lorem.sentence(4)

    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    const result = await sut.execute({
      sharerId: createdLink.sharerId.toString(),
      linkId: createdLink.id.toString(),
      newTitle,
    })

    expect(result.isSuccess()).toBe(true)
  })

  it('should not edit a link with wrong link id', async () => {
    const result = await sut.execute({
      sharerId: 'sharer-01',
      linkId: 'non-existing-id',
      newTitle: 'New title',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not edit a link from another sharer', async () => {
    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    const result = await sut.execute({
      sharerId: 'non-existing-id',
      linkId: createdLink.id.toString(),
      newTitle: 'New title',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ActionNotAllowedError)
  })
})
