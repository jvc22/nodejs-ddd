import type { Link } from '@/domains/shortener/enterprise/entities/link'

export interface LinkHTTP {
  id: string
  title: string
  url: string
  code: string
  accessCount: number
  createdAt: Date
  updatedAt?: Date | null
}

export class LinkPresenter {
  static toHTTP(link: Link): LinkHTTP {
    return {
      id: link.id.toString(),
      title: link.title,
      url: link.url,
      code: link.code.value,
      accessCount: link.accessCount,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    }
  }
}
