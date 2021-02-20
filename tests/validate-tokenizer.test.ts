import { isEven, validateTokenizer } from '../renderer/common/validate-tokenizer'


describe('validateTokenizer()', () => {

  it('should validate a string with no $', () => {

    expect(validateTokenizer('a string with no dollars')).toEqual(true)
  })

  it('should not validate a string with one $', () => {

    expect(validateTokenizer('a string with one $ dollar')).toEqual(false)
  })

  it('should validate a string with even $', () => {

    expect(validateTokenizer('$token$ text')).toEqual(true)
  })

  it('should not validate a string with odd $', () => {

    expect(validateTokenizer('$token$ text $ oops')).toEqual(false)
  })

  it('should validate a string with even $ and an excaped $', () => {

    expect(validateTokenizer('$token$ text \$ oops')).toEqual(false)
  })
})


describe('isEven()', () => {

  test('0 is even', () => {
    expect(isEven(0)).toEqual(true)
  })

  test('1 is not even', () => {
    expect(isEven(1)).toEqual(false)
  })

  test('2 is even', () => {
    expect(isEven(2)).toEqual(true)
  })
})
