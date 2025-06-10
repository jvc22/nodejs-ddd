import { describe, expect, it } from 'vitest'
import { Password } from './password'

describe('Password Value-Object', () => {
  it('should hash a password correctly', async () => {
    const password = '123456'

    const passwordHash = await Password.hash(password)

    await expect(passwordHash.compare(password)).resolves.toBe(true)
  })
})
