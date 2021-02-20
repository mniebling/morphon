import { escape } from '../renderer/common/escape'

describe('escape()', () => {

  it('should escape reserved regex characters', () => {

    const needEscapeChars = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', '{']
    const input = needEscapeChars.join('')

    expect(escape(input)).toEqual('\\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)\\[\\{') // we have to escape them here too lol
  })
})
