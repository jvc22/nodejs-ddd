import { type Either, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'

type FetchRecentLinksUseCaseRequest = {
  sharerId: string
  page: number
}

type FetchRecentLinksUseCaseResponse = Either<
  null,
  {
    links: Link[]
    totalCount: number
  }
>

export class FetchRecentLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    sharerId,
    page,
  }: FetchRecentLinksUseCaseRequest): Promise<FetchRecentLinksUseCaseResponse> {
    let totalCount = 0

    const links = await this.linksRepository.findManyBySharerId(sharerId, {
      page,
    })

    if (links.length > 0) {
      totalCount = await this.linksRepository.countManyBySharerId(sharerId)
    }

    return success({
      links,
      totalCount,
    })
  }
}
