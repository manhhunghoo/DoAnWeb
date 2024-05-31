import Navbar from "../Navbar";

function TodolistLayout({ children }) {
  return (
    <div>
      <header><Navbar /></header>

      <div className="max-h-[100vh] overflow-y-scroll pt-[100px]">{children}</div>
    </div>
  )
}

export default TodolistLayout