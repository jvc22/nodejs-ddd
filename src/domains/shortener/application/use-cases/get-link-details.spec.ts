import { makeLink } from 'test/factories/make-link'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetLinkDetailsUseCase } from './get-link-details'

let linksRepository: InMemoryLinksRepository
let sut: GetLinkDetailsUseCase

describe('Get Link Details Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new GetLinkDetailsUseCase(linksRepository)
  })

  it('should retrieve link data', async () => {
    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    const result = await sut.execute({
      linkId: createdLink.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.link).toEqual(createdLink)
    }
  })

  it('should not retrieve link data with wrong id', async () => {
    const result = await sut.execute({ linkId: 'non-existing-id' })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
