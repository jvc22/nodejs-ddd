import { makeLink } from 'test/factories/make-link'
import { makeSharer } from 'test/factories/make-sharer'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AccessLinkUseCase } from './access-link'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sharersRepository: InMemorySharersRepository
let linksRepository: InMemoryLinksRepository
let sut: AccessLinkUseCase

describe('Access Link Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    linksRepository = new InMemoryLinksRepository()
    sut = new AccessLinkUseCase(sharersRepository, linksRepository)
  })

  it('should access link and update count', async () => {
    const { sharer } = await makeSharer()
    await sharersRepository.create(sharer)

    const { link: createdLink } = makeLink({ sharerId: sharer.id })
    await linksRepository.create(createdLink)

    const { link: anotherLink } = makeLink({ sharerId: sharer.id })
    await linksRepository.create(anotherLink)

    for (let i = 0; i < 6; i++) {
      await sut.execute({
        code: createdLink.code.value,
      })
    }

    for (let i = 0; i < 5; i++) {
      await sut.execute({
        code: anotherLink.code.value,
      })
    }

    const result = await sut.execute({
      code: createdLink.code.value,
    })

    expect(result.isSuccess()).toBe(true)
    expect(sharersRepository.items[0].totalAccessCount).toBe(12)

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
