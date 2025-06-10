import { type Either, failure, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetLinkDetailsRequest = {
  linkId: string
}

type GetLinkDetailsResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class GetLinkDetails {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: GetLinkDetailsRequest): Promise<GetLinkDetailsResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      link,
    })
  }
}
