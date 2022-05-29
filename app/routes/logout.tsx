import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime'
import { logout } from '~/lib/session.server'

export const action: ActionFunction = async ({ request }) => {
  return logout(request)
}

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
