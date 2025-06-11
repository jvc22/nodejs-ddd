import { AuthenticateUseCase } from '@/domains/shortener/application/use-cases/authenticate'
import { PrismaSharersRepository } from 'prisma/repositories/prisma-sharers-repository'
import { prisma } from '../lib/prisma'

export function makeAuthenticateUseCase() {
  const sharersRepository = new PrismaSharersRepository(prisma)
  const authenticateUseCase = new AuthenticateUseCase(sharersRepository)

  return authenticateUseCase
}
