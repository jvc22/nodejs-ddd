import type { UseCaseError } from '@/core/types/use-case-error'

export class InvalidCredentialsError extends Error implements UseCaseError {
  public status = 400

  constructor() {
    super('Invalid credentials.')
  }
}
