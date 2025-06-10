import { type Either, failure, success } from '@/core/either'
import type { SharersRepository } from '../repositories/sharers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type EditProfileUseCaseRequest = {
  sharerId: string
  newName: string
}

type EditProfileUseCaseResponse = Either<ResourceNotFoundError, undefined>

export class EditProfileUseCase {
  constructor(private sharersRepository: SharersRepository) {}

  async execute({
    sharerId,
    newName,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const sharer = await this.sharersRepository.findById(sharerId)

    if (!sharer) {
      return failure(new ResourceNotFoundError())
    }

    sharer.name = newName

    await this.sharersRepository.update(sharer)

    return success(undefined)
  }
}
