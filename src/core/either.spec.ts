import { describe, expect, test } from 'vitest'
import { type Either, failure, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return success(12)
  }

  return failure('error')
}

describe('Either Handler', () => {
  test('success result', () => {
    const result = doSomething(true)

    expect(result.value).toEqual(expect.any(Number))
  })

  test('failure result', () => {
    const result = doSomething(false)

    expect(result.value).toEqual(expect.any(String))
  })
})
