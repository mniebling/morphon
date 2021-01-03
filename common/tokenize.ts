export function tokenize (text: string, tokenizer: string) {

  const { regExpString, groups } = parseTokenizer(tokenizer)
  const tokenizerRegex = new RegExp(regExpString, 'g')

  const tokens = text.match(tokenizerRegex)

  return tokens
}

/**
 * Given a tokenizer string, returns an object with two properties.
 *
 * The `regExpString` property contains a string that can be passed to the
 * `RegExp` constructor.
 *
 */
export function parseTokenizer(tokenizer: string) {

  let regExpString = ''
  let eating = false
  let charBeginsNewCapture = tokenizer.charAt(0) !== '$'
  const groups: Array<{ type: 'capture' | 'text', name: string | null }> = []

  for (const char of tokenizer) {
    // Create a new group if we're starting a new capture
    if (charBeginsNewCapture) {
      groups.push({
        type: eating ? 'capture' : 'text',
        name: eating ? '' : null,
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
      regExpString += '(.+)'
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
      regExpString += escape(char)
      charBeginsNewCapture = false
    }
  }

  return {
    groups,
    regExpString,
  }
}

function escape(char: string) {

  const needEscapeChars = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', '{']

  return needEscapeChars.includes(char)
    ? '\\' + char
    : char
}
