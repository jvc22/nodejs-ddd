import { type Either, failure, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetLinkDetailsUseCaseRequest = {
  linkId: string
}

type GetLinkDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class GetLinkDetailsUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: GetLinkDetailsUseCaseRequest): Promise<GetLinkDetailsUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      link,
    })
  }
}
