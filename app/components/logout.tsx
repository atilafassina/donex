const Logout = () => (
  <form className="flex flex-row-reverse p-4" action="/logout" method="post">
    <button
      type="submit"
      className="text-lg hover:text-orange-400 focus:text-orange-400"
    >
      Logout
    </button>
  </form>
)

export { Logout }
