import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeEditProfileUseCase } from '../../factories/make-edit-profile-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'

export const editProfile: FastifyPluginAsyncZod = async app => {
  app.put(
    '/sharers',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          newName: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { newName } = request.body

      const editProfileUseCase = makeEditProfileUseCase()

      const result = await editProfileUseCase.execute({
        sharerId: request.user.sub,
        newName,
      })

      if (result.isSuccess()) {
        return reply.status(200).send()
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
