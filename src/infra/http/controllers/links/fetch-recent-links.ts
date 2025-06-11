import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchRecentLinksUseCase } from '../../factories/make-fetch-recent-links-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { type LinkHTTP, LinkPresenter } from '../../presenters/link-presenter'

export const fetchRecentLinks: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links',
    {
      onRequest: [verifyJwt],
      schema: {
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            links: z.custom<LinkHTTP[]>(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query

      const fetchRecentLinksUseCase = makeFetchRecentLinksUseCase()

      const result = await fetchRecentLinksUseCase.execute({
        sharerId: request.user.sub,
        page,
      })

      if (result.isSuccess()) {
        return reply
          .status(200)
          .send({ links: result.value.links.map(LinkPresenter.toHTTP) })
      }
    }
  )
}
