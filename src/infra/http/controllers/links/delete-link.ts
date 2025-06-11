import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteLinkUseCase } from '../../factories/make-delete-link-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'

export const deleteLink: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/links/:id',
    {
      onRequest: [verifyJwt],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.null(),
          401: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const deleteLinkUseCase = makeDeleteLinkUseCase()

      const result = await deleteLinkUseCase.execute({
        sharerId: request.user.sub,
        linkId: id,
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
