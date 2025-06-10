import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterLinkUseCase } from './register-link'

let linksRepository: InMemoryLinksRepository
let sut: RegisterLinkUseCase

describe('Register Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new RegisterLinkUseCase(linksRepository)
  })

  it('should create a link', async () => {
    const url = 'https://example.com'

    const result = await sut.execute({
      sharerId: '1',
      title: 'Test link',
      url,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.link.url).toBe(url)
      expect(result.value.link.code.value).toEqual(expect.any(String))
    }
  })
})
