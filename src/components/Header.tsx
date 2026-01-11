import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center py-2 bg-gray-200 text-black px-8 font-semibold">
        <NavLink to="/">TanstackReactQuery</NavLink>
        <ul className="flex gap-8">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/fetchold">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/fetchrq">FetchRQ</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
