import { type Either, failure, success } from '@/core/either'
import type { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import type { SharersRepository } from '../repositories/sharers-repository'
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
  constructor(
    private sharersRepository: SharersRepository,
    private linksRepository: LinksRepository
  ) {}

  async execute({
    code,
  }: AccessLinkUseCaseRequest): Promise<AccessLinkUseCaseResponse> {
    const link = await this.linksRepository.findByCode(code)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    const sharer = await this.sharersRepository.findById(
      link.sharerId.toString()
    )

    link.accessCount += 1

    if (sharer) {
      sharer.totalAccessCount += 1

      await this.sharersRepository.update(sharer)
    }

    await this.linksRepository.update(link)

    return success({
      link,
    })
  }
}
