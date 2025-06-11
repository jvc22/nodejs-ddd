import { GetLinkDetailsUseCase } from '@/domains/shortener/application/use-cases/get-link-details'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeGetLinkDetailsUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const getLinkDetailsUseCase = new GetLinkDetailsUseCase(linksRepository)

  return getLinkDetailsUseCase
}
