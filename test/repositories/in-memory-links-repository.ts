import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { LinksRepository } from '@/domains/shortener/application/repositories/links-repository'
import type { Link } from '@/domains/shortener/enterprise/entities/link'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Link[] = []

  async findById(id: string) {
    const link = this.items.find(item => item.id.toString() === id)

    if (!link) {
      return null
    }

    return link
  }

  async findByCode(code: string) {
    const link = this.items.find(item => item.code.value === code)

    if (!link) {
      return null
    }

    return link
  }

  async findManyBySharerId(sharerId: string, params: PaginationParams) {
    const links = this.items
      .filter(item => item.sharerId.toString() === sharerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 10, params.page * 10)

    return links
  }

  async create(link: Link) {
    this.items.push(link)
  }

  async update(link: Link) {
    const itemIndex = this.items.findIndex(item => item.id === link.id)

    this.items[itemIndex] = link
  }

  async delete(link: Link) {
    const itemIndex = this.items.findIndex(item => item.id === link.id)

    this.items.splice(itemIndex, 1)
  }
}
