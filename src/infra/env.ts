import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
