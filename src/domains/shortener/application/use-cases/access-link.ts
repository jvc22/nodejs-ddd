import { type Either, failure, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type AccessLinkUseCaseRequest = {
  code: string
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
    code,
  }: AccessLinkUseCaseRequest): Promise<AccessLinkUseCaseResponse> {
    const link = await this.linksRepository.findByCode(code)

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
