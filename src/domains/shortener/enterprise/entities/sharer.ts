import { BaseEntity } from '@/core/entities/base-entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import type { Password } from './value-objects/password'

export interface SharerProps {
  name: string
  email: string
  passwordHash: Password
  totalAccessCount: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Sharer extends BaseEntity<SharerProps> {
  static create(
    props: Optional<SharerProps, 'totalAccessCount' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const sharer = new Sharer(
      {
        ...props,
        totalAccessCount: props.totalAccessCount ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return sharer
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get totalAccessCount() {
    return this.props.totalAccessCount
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(newName: string) {
    this.props.name = newName

    this.touch()
  }

  set totalAccessCount(newCount: number) {
    this.props.totalAccessCount = newCount

    this.touch()
  }
}
