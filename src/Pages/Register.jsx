// Register.jsx
import { Link, useLocation, useNavigate } from "react-router";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import logo from "../assets/logo_v2.png";
import { GrGoogle } from "react-icons/gr";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
export default function Register() {
  const { createUser, loading, setLoading, setUser, continueWithGoogle ,error,setError} =
    useContext(AuthContext);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  function handleSubmit(event) {
    event.preventDefault();
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const termsAccepted = event.target.terms.checked;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions!");
      return;
    }
    setError(null);

    createUser(email, password, fullName)
      .then((result) => {
        console.log(result);
        if (result) {
          setLoading(false);
          navigate(from, { replace: true });
        }
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
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-6 py-12">
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
            Start tracking every owe and lend, for free.
          </p>
          {error && <p className="text-sm text-error">{error}</p>}
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="form-control w-full">
              <span className="label-text mb-1">Full name</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiUser className="h-4 w-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Sabbir Alam"
                  className="grow"
                  name="fullName"
                />
              </label>
            </label>

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

            <label className="form-control w-full">
              <span className="label-text mb-1">Confirm password</span>
              <label className="input input-bordered flex items-center gap-2">
                <FiLock className="h-4 w-4 text-base-content/50" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  name="confirmPassword"
                />
              </label>
            </label>

            <label className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mt-0.5"
                name="terms"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="link text-primary">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="link text-primary">
                  Privacy Policy
                </a>
              </span>
            </label>

            {loading ? (
              <>
                {" "}
                <button className="btn" disabled>
                  <span className="loading loading-spinner"></span>
                  loading...
                </button>{" "}
              </>
            ) : (
              <button type="submit" className="btn btn-primary mt-2">
                Create Account
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
            Already have an account?{" "}
            <Link to="/login" className="link text-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
