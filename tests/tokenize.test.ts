import { parseTokenizer } from '../common/tokenize'


// describe('tokenize()', () => {

//   xit('should create tokens', () => {

//     const input = '123. Some Name'
//     const tokenizer = '$number$. $name$'
//     const expected = ['123', '. ', 'Some Name']

//     expect(tokenize(input, tokenizer)).toEqual(expected)
//   })
// })

describe('parseTokenizer()', () => {

  it('should handle a string with no tokens', () => {

    const input = 'this is a pattern'
    const expected = {
      groups: [{ type: 'text', name: null }],
      regExpString: 'this is a pattern',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with one token', () => {

    const input = '$token$text'
    const expected = {
      groups: [
        { type: 'capture', name: 'token' },
        { type: 'text', name: null },
      ],
      regExpString: '(.+)text',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with multiple tokens', () => {

    const input = '$token1$text$token2$'
    const expected = {
      groups: [
        { type: 'capture', name: 'token1' },
        { type: 'text', name: null },
        { type: 'capture', name: 'token2' },
      ],
      regExpString: '(.+)text(.+)',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with tokens and spaces', () => {

    const input = 'foo $token1$ text $token2$ 2'
    const expected = {
      groups: [
        { type: 'text', name: null },
        { type: 'capture', name: 'token1' },
        { type: 'text', name: null },
        { type: 'capture', name: 'token2' },
        { type: 'text', name: null },
      ],
      regExpString: 'foo (.+) text (.+) 2',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with only a token', () => {

    const input = '$onlyatoken$'
    const expected = {
      groups: [
        { type: 'capture', name: 'onlyatoken' },
      ],
      regExpString: '(.+)',
    }
  })

  it('should escape a string with special regex chars', () => {

    const input = '$token1$.|?2'
    const expected = {
      groups: [
        { type: 'capture', name: 'token1' },
        { type: 'text', name: null },
      ],
      regExpString: '(.+)\\.\\|\\?2',
    }
  })
})
