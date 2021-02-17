import { applyPattern } from '../renderer/common/apply-pattern'
import { Token } from '../renderer/common/tokenize'


describe('applyPattern()', () => {

  it('should return tokens for a basic pattern', () => {

    const pattern = 'check $one$ two $three$'
    const tokens: Token[] = [
      { type: 'capture', name: 'one', text: 'alpha' },
      { type: 'text', name: 'two', text: ' two ' },
      { type: 'capture', name: 'three', text: 'beta' },
    ]

    // replaced: `check alpha two beta`

    expect(applyPattern(pattern, tokens)).toEqual([
      { type: 'text', name: 'check ', text: 'check ' },
      { type: 'capture', name: 'one', text: 'alpha' },
      { type: 'text', name: ' two ', text: ' two ' },
      { type: 'capture', name: 'three', text: 'beta' },
    ])
  })

  it('should return empty array of tokens for blank inputs', () => {

    expect(applyPattern('', [])).toEqual([])
  })
})
