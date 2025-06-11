import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeGetProfileUseCase } from '../../factories/make-get-profile-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'
import {
  type SharerHTTP,
  SharerPresenter,
} from '../../presenters/sharer-presenter'

export const getProfile: FastifyPluginAsyncZod = async app => {
  app.get(
    '/sharers',
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          200: z.object({
            sharer: z.custom<SharerHTTP>(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const getProfileUseCase = makeGetProfileUseCase()

      const result = await getProfileUseCase.execute({
        sharerId: request.user.sub,
      })

      if (result.isSuccess()) {
        return reply
          .status(200)
          .send({ sharer: SharerPresenter.toHTTP(result.value.sharer) })
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
