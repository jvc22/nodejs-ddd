import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeGetMetricsUseCase } from '../../factories/make-get-metrics-use-case'
import { verifyJwt } from '../../middlewares/verify-jwt'

export const getMetrics: FastifyPluginAsyncZod = async app => {
  app.get(
    '/sharers/metrics',
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          200: z.object({
            metrics: z.object({
              totalCount: z.number(),
              totalAccessCount: z.number(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const getMetricsUseCase = makeGetMetricsUseCase()

      const result = await getMetricsUseCase.execute({
        sharerId: request.user.sub,
      })

      if (result.isSuccess()) {
        return reply.status(200).send({ metrics: result.value.metrics })
      }

      return reply
        .status(result.value.status)
        .send({ message: result.value.message })
    }
  )
}
