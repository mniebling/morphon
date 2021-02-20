/**
 * Escapes characters that need to be escaped in a RegEx.
 */
export function escape (text: string): string {

  const needEscapeChars = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', '{']

  return needEscapeChars.reduce((accum, current) => {
    return accum.replace(current, '\\' + current)
  }, text)
}
