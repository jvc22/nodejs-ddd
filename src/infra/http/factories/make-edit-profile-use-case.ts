import { EditProfileUseCase } from '@/domains/shortener/application/use-cases/edit-profile'
import { PrismaSharersRepository } from 'prisma/repositories/prisma-sharers-repository'
import { prisma } from '../lib/prisma'

export function makeEditProfileUseCase() {
  const sharersRepository = new PrismaSharersRepository(prisma)
  const editProfileUseCase = new EditProfileUseCase(sharersRepository)

  return editProfileUseCase
}
