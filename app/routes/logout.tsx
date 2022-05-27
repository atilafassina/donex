import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime'
// import { signOut } from '~/lib/session.server'

export const action: ActionFunction = async ({ request }) => {
  return redirect('/') //signOut(request)
}

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
