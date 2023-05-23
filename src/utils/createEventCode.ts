const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const generateCode = () => {
  const codeLength = 6
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }

  return code
}
