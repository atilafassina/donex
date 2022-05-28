import { SESSION_SECRET, XATA_API_KEY } from './environment'
import { XataClient } from './xata.codegen'
import bcrypt from 'bcryptjs'
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

const xata = new XataClient({
  branch: 'main',
  apiKey: XATA_API_KEY,
})

const checkIfUserExists = async (username: string) => {
  const user = await xata.db.users.filter('username', username).getOne()

  return Boolean(user)
}

const getUserId = async (request: Request) => {
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

export const fetchTodos = async (request: Request) => {
  const userId = (await getUserId(request)) as string

  const inProgress = await xata.db.todos
    /**
     * @todo
     * I think something wrong
     * with type inference of `.filter()`
     */
    // @ts-expect-error
    .filter('user.id', userId)
    .sort('created_at', 'desc')
    .getMany()

  const done = await xata.db.todos
    .sort('created_at', 'desc')
    .filter('is_done', true)
    .getMany()

  return {
    /**
     * @TODO
     * workaround for https://github.com/xataio/feedback/discussions/7
     */
    inProgress: inProgress.filter((todo) => todo.is_done !== true),
    done,
  }
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

export async function getUserToken(
  request: Request
): Promise<string | undefined> {
  const sessionCookie = await storage.getSession(request.headers.get('Cookie'))
  return sessionCookie.get('token')
}
