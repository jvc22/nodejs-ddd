import { AccessLinkUseCase } from '@/domains/shortener/application/use-cases/access-link'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeAccessLinkUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const accessLinkUseCase = new AccessLinkUseCase(linksRepository)

  return accessLinkUseCase
}
