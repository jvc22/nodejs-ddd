import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateAccountUseCase } from '../../factories/make-create-account-use-case'

export const createAccount: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sharers',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const createAccountUseCase = makeCreateAccountUseCase()

      const result = await createAccountUseCase.execute({
        name,
        email,
        password,
      })

      if (result.isSuccess()) {
        return reply.status(201).send()
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
