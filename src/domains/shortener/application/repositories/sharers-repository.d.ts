import type { Sharer } from '../../enterprise/entities/sharer'

export interface SharersRepository {
  findById(id: string): Promise<Sharer | null>
  findByEmail(email: string): Promise<Sharer | null>
  create(sharer: Sharer): Promise<void>
  update(sharer: Sharer): Promise<void>
}
