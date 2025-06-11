import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeAccessLinkUseCase } from '../../factories/make-access-link-use-case'

export const accessLink: FastifyPluginAsyncZod = async app => {
  app.get(
    '/:code',
    {
      schema: {
        params: z.object({
          code: z.string(),
        }),
        response: {
          302: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.params

      const accessLinkUseCase = makeAccessLinkUseCase()

      const result = await accessLinkUseCase.execute({
        code,
      })

      if (result.isSuccess()) {
        return reply.status(302).redirect(result.value.link.url)
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
