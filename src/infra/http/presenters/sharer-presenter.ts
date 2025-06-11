import type { Sharer } from '@/domains/shortener/enterprise/entities/sharer'

export interface SharerHTTP {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt?: Date | null
}

export class SharerPresenter {
  static toHTTP(sharer: Sharer): SharerHTTP {
    return {
      id: sharer.id.toString(),
      name: sharer.name,
      email: sharer.email,
      createdAt: sharer.createdAt,
      updatedAt: sharer.updatedAt,
    }
  }
}
