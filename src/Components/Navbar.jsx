import { Link } from "react-router";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo_v2.png";

export default function Navbar() {
  const { user, loading, LogOut } = useContext(AuthContext);

  return (
    <div className="drawer ">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content + navbar */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar border-b border-base-300 bg-base-100 px-4 md:px-8 lg:px-12">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex flex-1 items-center gap-2">
            <label
              htmlFor="nav-drawer"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FiMenu className="h-5 w-5" />
            </label>
            <Link to="/" className="shrink-0">
              <img src={logo} alt="DenaPawna" className="h-8 w-auto md:h-12" />
            </Link>
          </div>

          {/* Right: links (desktop) + avatar */}
          <div className="flex items-center gap-6">
            <ul className="menu menu-horizontal hidden gap-1 px-1 text-base lg:flex">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/contacts">Contacts</Link></li>
              <li><Link to="/transactions/new">Add</Link></li>
            </ul>

            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-2 border-blue-400 "
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content/70">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
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
                  className="menu dropdown-content z-20 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg border border-base-300"
                >
                  <li>
                    <Link to="/profile">
                      <FiUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => LogOut()}>
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Drawer side: mobile menu, slides in from left */}
      <div className="drawer-side z-30">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-64 gap-1 bg-base-100 p-4 text-base-content">
          <li className="mb-4">
            <img src={logo} alt="DenaPawna" className="h-auto w-46" />
          </li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/transactions/new">Add</Link></li>

          <div className="divider" />

          {user ? (
            <>
              <li><Link to="/profile"><FiUser /> Profile</Link></li>
              <li>
                <button onClick={() => LogOut()}>
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}