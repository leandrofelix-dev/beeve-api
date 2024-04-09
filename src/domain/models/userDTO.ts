export type UserCreateDTO = {
  fullName: string
  // dateOfBirth: string
  email: string
  password: string
  passwordConfirmation: string
  profilePicUrl: string | null
  isExternal: boolean
  institutionalCode: string | null
}
