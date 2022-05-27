import { ActionFunction, redirect } from '@remix-run/server-runtime'
import { useState } from 'react'
import { useActionData, useSearchParams } from '@remix-run/react'
import { login, registerUser } from '~/lib/db.server'
import {
  validateUsername,
  validatePassword,
  badRequest,
} from '~/lib/helpers.server'

type LoginActionData = {
  formError?: string
  fieldErrors?: {
    username?: string
    password?: string
  }

  username?: string
  password?: string
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  const action = form.get('_action')
  const username = form.get('username')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo') || '/dashboard'

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest(401, {
      formError: `Form not submitted correctly.`,
    })
  }

  // const fieldErrors = {
  //   username: validateUsername(username),
  //   password: validatePassword(password),
  // }

  // if (Object.values(fieldErrors).some(Boolean)) {
  //   return badRequest(401, { fieldErrors, username, password })
  // }

  console.log(action)
  if (action === 'login') {
    return login(username, password)
  }

  if (action === 'register') {
    return registerUser(username, password)
  }

  return redirect('/')
}

export default function Login() {
  const [formAction, setFormAction] = useState('login')
  const actionData = useActionData<LoginActionData>()
  const [searchParams] = useSearchParams()

  return (
    <div className="grid w-screen h-screen p-4 place-items-center text-zinc-300">
      <form
        method="post"
        className="relative grid grid-rows-2 gap-6 p-12 text-3xl bg-black rounded-md shadow-sm shadow-orange-200"
      >
        <input type="hidden" name="_action" value={formAction} />
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('redirectTo') ?? undefined}
        />
        <div className="absolute flex justify-between w-full align-middle -top-16">
          <button
            type="button"
            className="relative font-mono text-base top-10 hover:text-orange-200 focus:text-orange-200"
            onClick={() => {
              setFormAction(formAction === 'login' ? 'register' : 'login')
            }}
          >
            {formAction === 'login' ? 'register' : 'login'}
          </button>
          <strong className="text-orange-200">
            Get Done
            <span className="relative text-5xl text-orange-300 top-2 font-extralight">
              X
            </span>
          </strong>
        </div>
        <fieldset>
          <legend className="sr-only">login</legend>
          <div className="grid grid-cols-[auto_1fr] mb-5">
            <label htmlFor="email">e-mail:</label>
            <input
              className="ml-2 bg-transparent border-b-2 border-dotted outline-none hover:border-orange-200 focus:border-solid focus:border-orange-200"
              id="username-input"
              name="username"
              type="email"
              defaultValue={actionData?.username ?? ''}
            />
          </div>
          {actionData?.fieldErrors?.username && (
            <p className="text-red-400">{actionData.fieldErrors.username}</p>
          )}
          <div className="grid grid-cols-[auto_1fr] mb-5">
            <label htmlFor="password">password:</label>
            <input
              className="ml-2 bg-transparent border-b-2 border-dotted outline-none hover:border-orange-200 focus:border-solid focus:border-orange-200"
              id="password-input"
              name="password"
              type="password"
              autoComplete="current-password"
              defaultValue={actionData?.password ?? ''}
            />
          </div>
          {actionData?.fieldErrors?.password && (
            <p className="text-red-400">{actionData?.fieldErrors?.password}</p>
          )}
        </fieldset>
        <button
          className="p-4 mb-5 font-thin text-orange-200 transition-all border-2 border-orange-200 border-dotted rounded-md outline-none hover:border-solid"
          type="submit"
        >
          {formAction}
        </button>
        {actionData?.formError && (
          <p className="text-red-400">{actionData?.formError}</p>
        )}
      </form>
    </div>
  )
}
