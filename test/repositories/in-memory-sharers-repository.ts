import type { SharersRepository } from '@/domains/shortener/application/repositories/sharers-repository'
import type { Sharer } from '@/domains/shortener/enterprise/entities/sharer'

export class InMemorySharersRepository implements SharersRepository {
  public items: Sharer[] = []

  async findById(id: string) {
    const sharer = this.items.find(item => item.id.toString() === id)

    if (!sharer) {
      return null
    }

    return sharer
  }

  async findByEmail(email: string) {
    const sharer = this.items.find(item => item.email === email)

    if (!sharer) {
      return null
    }

    return sharer
  }

  async create(sharer: Sharer) {
    this.items.push(sharer)
  }

  async update(link: Sharer) {
    const itemIndex = this.items.findIndex(item => item.id === link.id)

    this.items[itemIndex] = link
  }
}
