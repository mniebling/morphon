import { parseTokenizer, tokenize } from '../renderer/common/tokenize'


describe('tokenize()', () => {

  it('should create tokens', () => {

    const input = '123. Some Name'
    const tokenizer = '$number$. $name$'
    const expected = [
      { text: '123', type: 'capture', name: 'number' },
      { text: '. ', type: 'text', name: '. ' },
      { text: 'Some Name', type: 'capture', name: 'name' },
    ]

    expect(tokenize(input, tokenizer)).toEqual(expected)
  })
})

describe('parseTokenizer()', () => {

  it('should handle a string with no tokens', () => {

    const input = 'this is a pattern'
    const expected = {
      groups: [{ type: 'text', name: 'this is a pattern' }],
      regExpString: '(this is a pattern)',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with one token', () => {

    const input = '$token$text'
    const expected = {
      groups: [
        { type: 'capture', name: 'token' },
        { type: 'text', name: 'text' },
      ],
      regExpString: '(.+)(text)',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with multiple tokens', () => {

    const input = '$token1$text$token2$'
    const expected = {
      groups: [
        { type: 'capture', name: 'token1' },
        { type: 'text', name: 'text' },
        { type: 'capture', name: 'token2' },
      ],
      regExpString: '(.+)(text)(.+)',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should handle a string with tokens and spaces', () => {

    const input = 'foo $token1$ text $token2$ 2'
    const expected = {
      groups: [
        { type: 'text', name: 'foo ' },
        { type: 'capture', name: 'token1' },
        { type: 'text', name: ' text ' },
        { type: 'capture', name: 'token2' },
        { type: 'text', name: ' 2' },
      ],
      regExpString: '(foo )(.+)( text )(.+)( 2)',
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

    expect(parseTokenizer(input)).toEqual(expected)
  })

  it('should escape a string with special regex chars', () => {

    const input = '$token1$.|?2'
    const expected = {
      groups: [
        { type: 'capture', name: 'token1' },
        { type: 'text', name: '.|?2' },
      ],
      regExpString: '(.+)(\\.\\|\\?2)',
    }

    expect(parseTokenizer(input)).toEqual(expected)
  })
})
