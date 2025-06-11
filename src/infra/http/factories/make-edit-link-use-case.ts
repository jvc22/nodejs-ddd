import { EditLinkUseCase } from '@/domains/shortener/application/use-cases/edit-link'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeEditLinkUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const editLinkUseCase = new EditLinkUseCase(linksRepository)

  return editLinkUseCase
}
