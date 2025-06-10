import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
