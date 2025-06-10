import type { UseCaseError } from '@/core/types/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  public status = 404

  constructor() {
    super('Resource not found.')
  }
}
