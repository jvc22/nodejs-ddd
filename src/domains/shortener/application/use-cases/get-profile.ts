import { type Either, failure, success } from '@/core/either'
import type { Sharer } from '../../enterprise/entities/sharer'
import type { SharersRepository } from '../repositories/sharers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetProfileUseCaseRequest = {
  sharerId: string
}

type GetProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sharer: Sharer
  }
>

export class GetProfileUseCase {
  constructor(private sharersRepository: SharersRepository) {}

  async execute({
    sharerId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const sharer = await this.sharersRepository.findById(sharerId)

    if (!sharer) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      sharer,
    })
  }
}
