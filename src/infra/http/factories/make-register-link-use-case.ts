import { RegisterLinkUseCase } from '@/domains/shortener/application/use-cases/register-link'
import { PrismaLinksRepository } from 'prisma/repositories/prisma-links-repository'
import { prisma } from '../lib/prisma'

export function makeRegisterLinkUseCase() {
  const linksRepository = new PrismaLinksRepository(prisma)
  const registerLinkUseCase = new RegisterLinkUseCase(linksRepository)

  return registerLinkUseCase
}
