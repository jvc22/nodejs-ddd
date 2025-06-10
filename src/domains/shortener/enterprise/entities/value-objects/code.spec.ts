import { describe, expect, it } from 'vitest'
import { Code } from './code'

describe('Code Value-Object', () => {
  it('should create a direct unique code from each url', () => {
    const url = 'http://example.com'
    const sameUrl = url

    const firstCode = Code.generateFromUrl(url)
    const secondCode = Code.generateFromUrl(sameUrl)

    expect(firstCode.value).toBe(secondCode.value)
  })
})
