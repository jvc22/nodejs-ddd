import type { UseCaseError } from '@/core/types/use-case-error'

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials.')
  }
}
