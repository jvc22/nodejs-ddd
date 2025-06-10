import type { UseCaseError } from '@/core/types/use-case-error'

export class ActionNotAllowedError extends Error implements UseCaseError {
  public status = 401

  constructor() {
    super('Action not allowed.')
  }
}
