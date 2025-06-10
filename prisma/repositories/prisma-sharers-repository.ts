import type { SharersRepository } from '@/domains/shortener/application/repositories/sharers-repository'
import type { Sharer } from '@/domains/shortener/enterprise/entities/sharer'
import type { PrismaClient } from 'prisma/generated/prisma'
import { PrismaSharerMapper } from 'prisma/mappers/prisma-sharer-mapper'

export class PrismaSharersRepository implements SharersRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const sharer = await this.prisma.sharer.findUnique({
      where: {
        id,
      },
    })

    if (!sharer) {
      return null
    }

    return PrismaSharerMapper.toDomain(sharer)
  }

  async findByEmail(email: string) {
    const sharer = await this.prisma.sharer.findUnique({
      where: {
        email,
      },
    })

    if (!sharer) {
      return null
    }

    return PrismaSharerMapper.toDomain(sharer)
  }

  async create(sharer: Sharer) {
    const data = PrismaSharerMapper.toPrisma(sharer)

    await this.prisma.sharer.create({
      data,
    })
  }

  async update(sharer: Sharer) {
    const data = PrismaSharerMapper.toPrisma(sharer)

    await this.prisma.sharer.update({
      where: {
        id: sharer.id.toString(),
      },
      data,
    })
  }
}
