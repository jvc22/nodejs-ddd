import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeRegisterLinkUseCase } from '../../factories/make-register-link-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'

export const registerLink: FastifyPluginAsyncZod = async app => {
  app.post(
    '/links',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          title: z.string(),
          url: z.string().url(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { title, url } = request.body

      const registerLinkUseCase = makeRegisterLinkUseCase()

      const result = await registerLinkUseCase.execute({
        sharerId: request.user.sub,
        title,
        url,
      })

      if (result.isSuccess()) {
        return reply.status(201).send()
      }
    }
  )
}
