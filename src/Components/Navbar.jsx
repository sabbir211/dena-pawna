import { Link } from "react-router";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="drawer">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content + navbar */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm px-4">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-2">
            <label htmlFor="nav-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <FiMenu className="h-5 w-5" />
            </label>
            <Link to="/" className="text-xl font-bold">
              MyApp
            </Link>
          </div>

          {/* Right: links (desktop) + avatar */}
          <div className="flex-1 justify-end items-center gap-4">
            <ul className="hidden lg:flex menu menu-horizontal px-1">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/contacts">Contacts</Link></li>
              <li><Link to="/transactions/new">Add</Link></li>
            </ul>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img src="https://i.pravatar.cc/100" alt="user avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                <li><Link to="/profile"><FiUser /> Profile</Link></li>
                <li><a><FiLogOut /> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer side: mobile menu, slides in from left */}
      <div className="drawer-side z-20">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          <li className="text-xl font-bold mb-4">MyApp</li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/transactions/new">Add</Link></li>
        </ul>
      </div>
    </div>
  );
}