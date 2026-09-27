import { Link } from "react-router";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import logo from "../assets/logo_v2.png";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function Navbar() {
  const { user, loading, LogOut } = useContext(AuthContext);

  return (
    <div className="drawers">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content + navbar */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm px-4">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="nav-drawer"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FiMenu className="h-5 w-5" />
            </label>
            <Link to="/" className="text-xl font-bold">
              <img src={logo} alt="logo" className="w-11/12 md:w-1/3 " />
            </Link>
          </div>

          {/* Right: links (desktop) + avatar */}
          <div className="flex justify-end w-full px-6 md:px-18 items-center gap-4 ">
            <ul className="hidden lg:flex menu menu-horizontal px-1 text-lg">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/transactions/new">Add</Link>
              </li>
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                </>
              ) : (
                !user && (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )
              )}
            </ul>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content/70">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.displayName || "User avatar"}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold leading-none">
                      {user?.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    <FiUser /> Profile
                  </Link>
                </li>
                {user && (
                  <li>
                    <button onClick={() => LogOut()}>
                      <FiLogOut /> Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer side: mobile menu, slides in from left */}
      <div className="drawer-side   z-20  ">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          <li className="text-xl font-bold mb-4">
            <img src={logo} alt="logo" className="w-2/3" />
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/transactions/new">Add</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
