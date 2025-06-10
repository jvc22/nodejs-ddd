import type { UseCaseError } from '@/core/types/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found.')
  }
}
