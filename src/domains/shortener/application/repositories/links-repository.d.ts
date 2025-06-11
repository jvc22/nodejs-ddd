import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Link } from '../../enterprise/entities/link'

export interface LinksRepository {
  findById(id: string): Promise<Link | null>
  findByCode(code: string): Promise<Link | null>
  findManyBySharerId(
    sharerId: string,
    params: PaginationParams
  ): Promise<Link[]>
  create(link: Link): Promise<void>
  update(link: Link): Promise<void>
  delete(link: Link): Promise<void>
}
