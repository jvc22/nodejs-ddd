import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Link } from '@/domains/shortener/enterprise/entities/link'
import { Code } from '@/domains/shortener/enterprise/entities/value-objects/code'
import type { Prisma, Link as PrismaLink } from 'prisma/generated/prisma'

export class PrismaLinkMapper {
  static toDomain(raw: PrismaLink): Link {
    return Link.create(
      {
        title: raw.title,
        url: raw.url,
        code: Code.create(raw.code),
        accessCount: raw.accessCount,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        sharerId: new UniqueEntityId(raw.sharerId),
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(link: Link): Prisma.LinkUncheckedCreateInput {
    return {
      id: link.id.toString(),
      title: link.title,
      url: link.url,
      code: link.code.value,
      accessCount: link.accessCount,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
      sharerId: link.sharerId.toString(),
    }
  }
}
