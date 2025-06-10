import { type Either, failure, success } from '@/core/either'
import type { LinksRepository } from '../repositories/links-repository'
import { ActionNotAllowedError } from './errors/action-not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type DeleteLinkUseCaseRequest = {
  sharerId: string
  linkId: string
}

type DeleteLinkUseCaseResponse = Either<
  ResourceNotFoundError | ActionNotAllowedError,
  undefined
>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    sharerId,
    linkId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    if (link.sharerId.toString() !== sharerId) {
      return failure(new ActionNotAllowedError())
    }

    await this.linksRepository.delete(link)

    return success(undefined)
  }
}
