import { type Either, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Link } from '../../enterprise/entities/link'
import type { LinksRepository } from '../repositories/links-repository'

type RegisterLinkUseCaseRequest = {
  sharerId: string
  title: string
  url: string
}

type RegisterLinkUseCaseResponse = Either<
  null,
  {
    link: Link
  }
>

export class RegisterLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    sharerId,
    title,
    url,
  }: RegisterLinkUseCaseRequest): Promise<RegisterLinkUseCaseResponse> {
    const link = Link.create({
      title,
      url,
      sharerId: new UniqueEntityId(sharerId),
    })

    await this.linksRepository.create(link)

    return success({
      link,
    })
  }
}
