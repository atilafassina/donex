import { json } from '@remix-run/server-runtime'

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateUsername(username: string): string | undefined {
  if (!EMAIL_REGEX.test(username)) {
    return `You must to pass a valid e-mail address`
  }
}

function validatePassword(password: string): string | undefined {
  if (password.length < 6) {
    return `Passwords must be at least 6 characters long`
  }
}

export { validatePassword, validateUsername }

export const badRequest = (status: number, error: any) =>
  json(error, { status })
