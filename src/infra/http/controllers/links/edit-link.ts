import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeEditLinkUseCase } from '../../factories/make-edit-link-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'

export const editLink: FastifyPluginAsyncZod = async app => {
  app.put(
    '/links/:id',
    {
      onRequest: [verifyJwt],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          newTitle: z.string(),
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
      const { newTitle } = request.body

      const editLinkUseCase = makeEditLinkUseCase()

      const result = await editLinkUseCase.execute({
        sharerId: request.user.sub,
        linkId: id,
        newTitle,
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
