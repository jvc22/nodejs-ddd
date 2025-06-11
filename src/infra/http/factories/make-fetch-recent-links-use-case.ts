import { FetchRecentLinksUseCase } from '@/domains/shortener/application/use-cases/fetch-recent-links'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeFetchRecentLinksUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const fetchRecentLinksUseCase = new FetchRecentLinksUseCase(linksRepository)

  return fetchRecentLinksUseCase
}
