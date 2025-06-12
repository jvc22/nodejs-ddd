import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Sharer } from '@/domains/shortener/enterprise/entities/sharer'
import { Password } from '@/domains/shortener/enterprise/entities/value-objects/password'
import type { Prisma, Sharer as PrismaSharer } from 'prisma/generated/prisma'

export class PrismaSharerMapper {
  static toDomain(raw: PrismaSharer): Sharer {
    return Sharer.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: Password.create(raw.passwordHash),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(sharer: Sharer): Prisma.SharerUncheckedCreateInput {
    return {
      id: sharer.id.toString(),
      name: sharer.name,
      email: sharer.email,
      passwordHash: sharer.passwordHash.hash,
      totalAccessCount: sharer.totalAccessCount,
      createdAt: sharer.createdAt,
      updatedAt: sharer.updatedAt,
    }
  }
}
