import { DeleteLinkUseCase } from '@/domains/shortener/application/use-cases/delete-link'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeDeleteLinkUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const deleteLinkUseCase = new DeleteLinkUseCase(linksRepository)

  return deleteLinkUseCase
}
