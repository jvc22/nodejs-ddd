import { CreateAccountUseCase } from '@/domains/shortener/application/use-cases/create-account'
import { PrismaSharersRepository } from 'prisma/repositories/prisma-sharers-repository'
import { prisma } from '../lib/prisma'

export function makeCreateAccountUseCase() {
  const sharersRepository = new PrismaSharersRepository(prisma)
  const createAccountUseCase = new CreateAccountUseCase(sharersRepository)

  return createAccountUseCase
}
