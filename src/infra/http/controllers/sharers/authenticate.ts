import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '../../factories/make-authenticate-use-case'

export const authenticate: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sessions',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string().jwt(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateUseCase = makeAuthenticateUseCase()

      const result = await authenticateUseCase.execute({
        email,
        password,
      })

      if (result.isSuccess()) {
        const token = await reply.jwtSign(
          {},
          {
            sign: {
              sub: result.value.sharer.id.toString(),
            },
          }
        )

        return reply.status(200).send({ token })
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
