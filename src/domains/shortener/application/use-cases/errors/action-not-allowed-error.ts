import type { UseCaseError } from '@/core/types/use-case-error'

export class ActionNotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Action not allowed.')
  }
}
