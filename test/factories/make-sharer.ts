import { faker } from '@faker-js/faker'

import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Sharer,
  type SharerProps,
} from '@/domains/shortener/enterprise/entities/sharer'
import { Password } from '@/domains/shortener/enterprise/entities/value-objects/password'

export async function makeSharer(
  override: Partial<SharerProps> = {},
  id?: UniqueEntityId
) {
  const name = faker.person.fullName()
  const email = faker.internet.email()
  const password = faker.internet.password({ length: 8 })

  const sharer = Sharer.create(
    {
      name,
      email,
      passwordHash: await Password.hash(password),
      ...override,
    },
    id
  )

  return {
    sharer,
    data: {
      password,
    },
  }
}
