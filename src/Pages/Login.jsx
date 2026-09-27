import { Link, useLocation, useNavigate } from "react-router";
import { FiMail, FiLock } from "react-icons/fi";
import logo from "../assets/logo_v2.png";
import { GrGoogle } from "react-icons/gr";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
export default function Login() {
  const [error, setError] = useState(null);
const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from?.pathname || "/"; 

  const {loginUser, loading,setLoading,continueWithGoogle}=useContext(AuthContext)

  function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password)
      .then((result) => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }); 
  }
  function signInWithGoogle() {
    continueWithGoogle()
      .then((result) => {
        setLoading(false);
        navigate(from, { replace: true });  
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }
  return (
    <div className="flex min-h-11/12 items-center justify-center bg-base-200 px-6 py-12">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h1 className="text-2xl font-bold">
            Welcome back to{" "}
            <img
              src={logo}
              alt="DenaPawna logo"
              className="inline-block h-12 w-auto"
            />
          </h1>
          <p className="text-sm text-base-content/70">
            Log in to see who owes you and what you owe.
          </p>
          {error && <p className="text-sm text-error">{error}</p>}
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="form-control w-full">
              <span className="label-text mb-1">Email</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiMail className="h-4 w-4 text-base-content/50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="grow"
                  name="email"
                />
              </label>
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Password</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiLock className="h-4 w-4 text-base-content/50" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  name="password"
                />
              </label>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <a href="#" className="link link-hover text-primary">
                Forgot password?
              </a>
            </div>

            {loading ? (
              <button type="submit" className="btn btn-primary mt-2" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary mt-2">
                Log In
              </button>
            )}
          </form>
          <div>
            <p className="text-center text-sm text-base-content/70 pt-4">or</p>
            
            {loading ? (
              <>
                {" "}
                <button className="btn" disabled>
                  <span className="loading loading-spinner"></span>
                  loading...
                </button>{" "}
              </>
            ) : (
              <button
                className="btn btn-outline btn-secondary w-full"
                onClick={signInWithGoogle}
              >
                <GrGoogle /> Continue With Google{" "}
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-base-content/70">
            Don't have an account?{" "}
            <Link to="/register" className="link text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
