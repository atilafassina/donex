import bcrypt from 'bcryptjs'
import { xata } from '~/lib/db.server'
import { SESSION_SECRET } from '~/lib/environment'
import { redirect } from '@remix-run/server-runtime'
import { createCookieSessionStorage } from '@remix-run/netlify-edge'

const storage = createCookieSessionStorage({
  cookie: {
    name: 'donex_session',
    // localhost won't work on safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})
const checkIfUserExists = async (username: string) => {
  const user = await xata.db.users.filter('username', username).getOne()

  return Boolean(user)
}
export const getUserId = async (request: Request) => {
  const session = await storage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') return null

  return userId
}
export const getUsername = async (request: Request) => {
  const userId = await getUserId(request)
  if (!userId || typeof userId !== 'string') {
    throw redirect(`/login`)
  }

  const user = await xata.db.users.read(userId)

  return user
}

export const login = async (username: string, password: string) => {
  const user = await xata.db.users.filter('username', username).getOne()

  if (!user) {
    return redirect('/login')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password || '')

  if (!isPasswordValid) {
    return redirect('/login')
  }

  return createUserSession(user.id, '/')
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export const registerUser = async (username: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10)

  if (await checkIfUserExists(username)) {
    return redirect('/login')
  }

  const user = await xata.db.users.create({
    username,
    password: passwordHash,
  })

  return createUserSession(user.id, '/')
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}
