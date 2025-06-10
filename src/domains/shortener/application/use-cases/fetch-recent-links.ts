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
  }
>

export class FetchRecentLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    sharerId,
    page,
  }: FetchRecentLinksUseCaseRequest): Promise<FetchRecentLinksUseCaseResponse> {
    const links = await this.linksRepository.findManyBySharerId(sharerId, {
      page,
    })

    return success({
      links,
    })
  }
}
