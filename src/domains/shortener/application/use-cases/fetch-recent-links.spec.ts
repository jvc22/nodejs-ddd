import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeLink } from 'test/factories/make-link'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchRecentLinksUseCase } from './fetch-recent-links'

let linksRepository: InMemoryLinksRepository
let sut: FetchRecentLinksUseCase

describe('Fetch Recent Links Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new FetchRecentLinksUseCase(linksRepository)
  })

  it("should fetch recent sharer's links", async () => {
    const sharerId = new UniqueEntityId()

    for (let i = 0; i < 7; i++) {
      await linksRepository.create(makeLink({ sharerId }).link)
    }

    const result = await sut.execute({
      sharerId: sharerId.toString(),
      page: 1,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.links).toHaveLength(7)
    }
  })

  it("should fetch recent sharer's links with correct pagination", async () => {
    const sharerId = new UniqueEntityId()

    for (let i = 0; i < 12; i++) {
      await linksRepository.create(makeLink({ sharerId }).link)
    }

    const [firstSectionResult, secondSectionResult] = await Promise.all([
      sut.execute({
        sharerId: sharerId.toString(),
        page: 1,
      }),
      sut.execute({
        sharerId: sharerId.toString(),
        page: 2,
      }),
    ])

    expect(firstSectionResult.isSuccess()).toBe(true)
    expect(secondSectionResult.isSuccess()).toBe(true)

    if (firstSectionResult.isSuccess() && secondSectionResult.isSuccess()) {
      expect(firstSectionResult.value.links).toHaveLength(10)
      expect(secondSectionResult.value.links).toHaveLength(2)
    }
  })
})
