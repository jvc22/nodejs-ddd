import { GetProfileUseCase } from '@/domains/shortener/application/use-cases/get-profile'
import { PrismaSharersRepository } from 'prisma/repositories/prisma-sharers-repository'
import { prisma } from '../lib/prisma'

export function makeGetProfileUseCase() {
  const sharersRepository = new PrismaSharersRepository(prisma)
  const getProfileUseCase = new GetProfileUseCase(sharersRepository)

  return getProfileUseCase
}
