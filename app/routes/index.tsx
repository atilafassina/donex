import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <main className="grid h-screen w-screen grid-rows-[auto_1fr]">
      <nav className="pt-2 pl-2">
        <Link to="/login">Login</Link>
      </nav>
      <header className="grid place-items-center">
        <h1 className="p-8 text-orange-200 shadow-lg text-9xl shadow-orange-300">
          Done
          <span className="text-orange-400 text-[12rem] relative top-7 font-extralight">
            X
          </span>
        </h1>
      </header>
    </main>
  )
}
