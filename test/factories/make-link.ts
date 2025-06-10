import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Link,
  type LinkProps,
} from '@/domains/shortener/enterprise/entities/link'
import { Code } from '@/domains/shortener/enterprise/entities/value-objects/code'
import { faker } from '@faker-js/faker'

export function makeLink(
  override: Partial<LinkProps> = {},
  id?: UniqueEntityId
) {
  const title = faker.lorem.sentence(3)
  const url = faker.internet.url()
  const sharerId = new UniqueEntityId()

  const link = Link.create(
    {
      title,
      url,
      code: Code.generateFromUrl(url),
      sharerId,
      ...override,
    },
    id
  )

  return {
    link,
  }
}
