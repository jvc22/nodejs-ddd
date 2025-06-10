import { createHash } from 'node:crypto'

const BASE62_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const CODE_LENGTH = 8

export class Code {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(code: string) {
    return new Code(code)
  }

  static generateFromUrl(url: string) {
    const hash = createHash('md5').update(url).digest('hex')
    const seed = Number.parseInt(hash.substring(0, 8), 16)

    const pseudoRandom = Math.sin(seed) * 10000
    const normalizedRandom = pseudoRandom - Math.floor(pseudoRandom)

    let numericValue = Math.floor(
      normalizedRandom * BASE62_CHARS.length ** CODE_LENGTH
    )
    let code = ''

    for (let i = 0; i < CODE_LENGTH; i++) {
      const charIndex = numericValue % BASE62_CHARS.length
      code = BASE62_CHARS[charIndex] + code
      numericValue = Math.floor(numericValue / BASE62_CHARS.length)
    }

    return new Code(code)
  }
}
