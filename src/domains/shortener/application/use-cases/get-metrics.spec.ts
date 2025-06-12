import { makeLink } from 'test/factories/make-link'
import { makeSharer } from 'test/factories/make-sharer'
import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { InMemorySharersRepository } from 'test/repositories/in-memory-sharers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetMetricsUseCase } from './get-metrics'

let sharersRepository: InMemorySharersRepository
let linksRepository: InMemoryLinksRepository
let sut: GetMetricsUseCase

describe('Get Metrics Use Case', () => {
  beforeEach(() => {
    sharersRepository = new InMemorySharersRepository()
    linksRepository = new InMemoryLinksRepository()
    sut = new GetMetricsUseCase(sharersRepository, linksRepository)
  })

  it('should get sharer metrics', async () => {
    const { sharer } = await makeSharer()
    await sharersRepository.create(sharer)

    for (let i = 0; i < 7; i++) {
      const { link } = makeLink({ sharerId: sharer.id })
      await linksRepository.create(link)
    }

    const result = await sut.execute({
      sharerId: sharer.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.metrics.totalCount).toBe(7)
      expect(result.value.metrics.totalAccessCount).toBe(0)
    }
  })

  it('should not get sharer metrics with wrong id', async () => {
    const result = await sut.execute({ sharerId: 'non-existing-id' })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
