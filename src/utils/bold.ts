import parse from 'html-react-parser'

export const boldText = (input: string, keyword: string) =>
  parse(input.replace(keyword, `<mark>${keyword}</mark>`))
