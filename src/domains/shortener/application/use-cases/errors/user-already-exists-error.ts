import type { UseCaseError } from '@/core/types/use-case-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  public status = 409

  constructor() {
    super('Sharer already exists with this e-mail.')
  }
}
