import { type Either, failure, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type AccessLinkUseCaseRequest = {
  linkId: string
}

type AccessLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class AccessLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: AccessLinkUseCaseRequest): Promise<AccessLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    link.accessCount += 1

    await this.linksRepository.update(link)

    return success({
      link,
    })
  }
}
