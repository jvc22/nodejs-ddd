import { type Either, failure, success } from '@/core/either'
import { Sharer } from '../../enterprise/entities/sharer'
import { Password } from '../../enterprise/entities/value-objects/password'
import type { SharersRepository } from '../repositories/sharers-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type CreateAccountUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateAccountUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    sharer: Sharer
  }
>

export class CreateAccountUseCase {
  constructor(private sharersRepository: SharersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const existingSharer = await this.sharersRepository.findByEmail(email)

    if (existingSharer) {
      return failure(new UserAlreadyExistsError())
    }

    const sharer = Sharer.create({
      name,
      email,
      passwordHash: await Password.hash(password),
    })

    await this.sharersRepository.create(sharer)

    return success({
      sharer,
    })
  }
}
