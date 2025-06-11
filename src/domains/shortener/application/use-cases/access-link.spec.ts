import { makeLink } from 'test/factories/make-link'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AccessLinkUseCase } from './access-link'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let linksRepository: InMemoryLinksRepository
let sut: AccessLinkUseCase

describe('Access Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new AccessLinkUseCase(linksRepository)
  })

  it('should access link and update count', async () => {
    const { link: createdLink } = makeLink()
    await linksRepository.create(createdLink)

    for (let i = 0; i < 6; i++) {
      await sut.execute({
        code: createdLink.code.value,
      })
    }

    const result = await sut.execute({
      code: createdLink.code.value,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.link.accessCount).toBe(7)
    }
  })

  it('should not access link with wrong id', async () => {
    const result = await sut.execute({ code: 'non-existing-code' })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
