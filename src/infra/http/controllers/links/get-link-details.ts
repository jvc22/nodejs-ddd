import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeGetLinkDetailsUseCase } from '../../factories/make-get-link-details-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { type LinkHTTP, LinkPresenter } from '../../presenters/link-presenter'

export const getLinkDetails: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links/:id',
    {
      onRequest: [verifyJwt],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            link: z.custom<LinkHTTP>(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const getLinkDetailsUseCase = makeGetLinkDetailsUseCase()

      const result = await getLinkDetailsUseCase.execute({
        linkId: id,
      })

      if (result.isSuccess()) {
        return reply
          .status(200)
          .send({ link: LinkPresenter.toHTTP(result.value.link) })
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
