import { type Either, failure, success } from '@/core/either'
import type { Sharer } from '../../enterprise/entities/sharer'
import type { SharersRepository } from '../repositories/sharers-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    sharer: Sharer
  }
>

export class AuthenticateUseCase {
  constructor(private sharersRepository: SharersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const sharer = await this.sharersRepository.findByEmail(email)

    if (!sharer) {
      return failure(new InvalidCredentialsError())
    }

    const doPasswordsMatch = await sharer.passwordHash.compare(password)

    if (!doPasswordsMatch) {
      return failure(new InvalidCredentialsError())
    }

    return success({
      sharer,
    })
  }
}
