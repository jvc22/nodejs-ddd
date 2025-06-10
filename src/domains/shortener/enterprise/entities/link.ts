import { BaseEntity } from '@/core/entities/base-entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Code } from './value-objects/code'

export interface LinkProps {
  code: Code
  title: string
  url: string
  accessCount: number
  createdAt: Date
  updatedAt?: Date | null
  sharerId: UniqueEntityId
}

export class Link extends BaseEntity<LinkProps> {
  static create(
    props: Optional<LinkProps, 'code' | 'accessCount' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const link = new Link(
      {
        ...props,
        code: props.code ?? Code.generateFromUrl(props.url),
        accessCount: props.accessCount ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return link
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get code() {
    return this.props.code
  }

  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  get accessCount() {
    return this.props.accessCount
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get sharerId() {
    return this.props.sharerId
  }

  set title(newTitle: string) {
    this.props.title = newTitle

    this.touch()
  }

  set accessCount(newCount: number) {
    this.props.accessCount = newCount

    this.touch()
  }
}
