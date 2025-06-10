import { compare, hash } from 'bcryptjs'

export class Password {
  private value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(passwordHash: string) {
    return new Password(passwordHash)
  }

  static async hash(password: string) {
    const passwordHash = await hash(password, 6)

    return new Password(passwordHash)
  }

  async compare(password: string) {
    const doPasswordsMatch = await compare(password, this.value)

    return doPasswordsMatch
  }

  get hash() {
    return this.value
  }
}
