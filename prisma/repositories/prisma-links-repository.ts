import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { LinksRepository } from '@/domains/shortener/application/repositories/links-repository'
import type { Link } from '@/domains/shortener/enterprise/entities/link'
import type { PrismaClient } from 'prisma/generated/prisma'
import { PrismaLinkMapper } from 'prisma/mappers/prisma-link-mapper'

export class PrismaLinksRepository implements LinksRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const link = await this.prisma.link.findUnique({
      where: {
        id,
      },
    })

    if (!link) {
      return null
    }

    return PrismaLinkMapper.toDomain(link)
  }

  async findManyBySharerId(sharerId: string, params: PaginationParams) {
    const links = await this.prisma.link.findMany({
      where: {
        sharerId,
      },
      skip: (params.page - 1) * 10,
      take: params.page * 10,
    })

    return links.map(PrismaLinkMapper.toDomain)
  }

  async create(link: Link) {
    const data = PrismaLinkMapper.toPrisma(link)

    await this.prisma.link.create({
      data,
    })
  }

  async update(link: Link) {
    const data = PrismaLinkMapper.toPrisma(link)

    await this.prisma.link.update({
      where: {
        id: link.id.toString(),
      },
      data,
    })
  }

  async delete(link: Link) {
    await this.prisma.link.delete({
      where: {
        id: link.id.toString(),
      },
    })
  }
}
