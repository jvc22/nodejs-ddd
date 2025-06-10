import { makeLink } from 'test/factories/make-link'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteLinkUseCase } from './delete-link'
import { ActionNotAllowedError } from './errors/action-not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let linksRepository: InMemoryLinksRepository
let sut: DeleteLinkUseCase

describe('Delete Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new DeleteLinkUseCase(linksRepository)
  })

  it('should delete a link', async () => {
    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    const result = await sut.execute({
      sharerId: createdLink.sharerId.toString(),
      linkId: createdLink.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(linksRepository.items).toHaveLength(0)
  })

  it('should not delete a link with wrong link id', async () => {
    const result = await sut.execute({
      sharerId: 'sharer-01',
      linkId: 'non-existing-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not delete a link from another sharer', async () => {
    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    const result = await sut.execute({
      sharerId: 'non-existing-id',
      linkId: createdLink.id.toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ActionNotAllowedError)
  })
})
