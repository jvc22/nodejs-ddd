import { type Either, failure, success } from '@/core/either'
import type { LinksRepository } from '../repositories/links-repository'
import type { SharersRepository } from '../repositories/sharers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetMetricsUseCaseRequest = {
  sharerId: string
}

type GetMetricsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    metrics: {
      totalCount: number
      totalAccessCount: number
    }
  }
>

export class GetMetricsUseCase {
  constructor(
    private sharersRepository: SharersRepository,
    private linksRepository: LinksRepository
  ) {}

  async execute({
    sharerId,
  }: GetMetricsUseCaseRequest): Promise<GetMetricsUseCaseResponse> {
    const sharer = await this.sharersRepository.findById(sharerId)

    if (!sharer) {
      return failure(new ResourceNotFoundError())
    }

    const totalCount = await this.linksRepository.countManyBySharerId(sharerId)

    return success({
      metrics: {
        totalCount,
        totalAccessCount: sharer.totalAccessCount,
      },
    })
  }
}
