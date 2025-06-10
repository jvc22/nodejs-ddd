import { type Either, failure, success } from '@/core/either'
import type { LinksRepository } from '../repositories/links-repository'
import { ActionNotAllowedError } from './errors/action-not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type EditLinkUseCaseRequest = {
  sharerId: string
  linkId: string
  newTitle: string
}

type EditLinkUseCaseResponse = Either<
  ResourceNotFoundError | ActionNotAllowedError,
  undefined
>

export class EditLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    sharerId,
    linkId,
    newTitle,
  }: EditLinkUseCaseRequest): Promise<EditLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      return failure(new ResourceNotFoundError())
    }

    if (link.sharerId.toString() !== sharerId) {
      return failure(new ActionNotAllowedError())
    }

    link.title = newTitle

    await this.linksRepository.update(link)

    return success(undefined)
  }
}
