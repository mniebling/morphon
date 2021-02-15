export interface Token {
  text: string
  type: 'capture' | 'text'
  name: string
}

export function tokenize (text: string, tokenizer: string) {

  const { regExpString, groups } = parseTokenizer(tokenizer)
  const tokenizerRegex = new RegExp(regExpString, 'g')
  const matches = Array.from(text.matchAll(tokenizerRegex))[0] || []

  if (!matches.length) return []

  const tokens: Token[] = []

  // `for... of` iteration skips the "built-in" properties on the iterator, like "index"
  // Is there a cleaner way to map the iterator and skip these?
  for (const [i, match] of matches.entries()) {
    if (i === 0) continue // the first match is the entire string

    tokens.push({
      text: match,
      type: groups[i - 1].type,
      name: groups[i - 1].name,
    })
  }

  return tokens
}

export function parseTokenizer (tokenizer: string) {

  let eating = false
  let charBeginsNewCapture = tokenizer.charAt(0) !== '$'
  const groups: Array<{ type: 'capture' | 'text', name: string }> = []

  for (const char of tokenizer) {
    // Create a new group if we're starting a new capture
    if (charBeginsNewCapture) {
      groups.push({
        type: eating ? 'capture' : 'text',
        name: '',
      })
    }
    // If char is a $ and we are eating characters, skip it and stop eating characters
    if (char === '$' && eating) {
      eating = false
      charBeginsNewCapture = true // the next character will start a new group
      continue
    }
    // If char is a $ and we are not eating characters, add a capture group to the regex and start eating characters
    if (char === '$' && !eating) {
      eating = true
      charBeginsNewCapture = true
      continue
    }
    // If char is not a $, and we are eating, add it to the group name
    if (char !== '$' && eating) {
      groups[groups.length - 1].name += char
      charBeginsNewCapture = false
      continue
    }
    // If char is not a $ and we are not eating, add it to the regex
    if (char !== '$' && !eating) {
      groups[groups.length - 1].name += char
      charBeginsNewCapture = false
    }
  }

  const regExpString = groups
    .map(group => group.type === 'capture' ? '(.+)' : `(${escape(group.name)})`)
    .join('')

  return {
    groups,
    regExpString,
  }
}

function escape (text: string) {

  const needEscapeChars = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', '{']

  return needEscapeChars.reduce((accum, current) => {
    return accum.replace(current, '\\' + current)
  }, text)
}
