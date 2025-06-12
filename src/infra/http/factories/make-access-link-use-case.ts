import { AccessLinkUseCase } from '@/domains/shortener/application/use-cases/access-link'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { PrismaSharersRepository } from 'prisma/repositories/prisma-sharers-repository'
import { prisma } from '../lib/prisma'

export function makeAccessLinkUseCase() {
  const sharersRepository = new PrismaSharersRepository(prisma)
  const linksRepository = new PrismaLinksRepository(prisma)
  const accessLinkUseCase = new AccessLinkUseCase(
    sharersRepository,
    linksRepository
  )

  return accessLinkUseCase
}
