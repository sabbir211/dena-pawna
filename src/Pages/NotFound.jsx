import React from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-base-100 shadow-2xl lg:grid-cols-2">
          <div className="flex items-center justify-center bg-primary p-10 text-primary-content sm:p-16">
            <div className="text-center">
              <p className="text-8xl font-black tracking-tighter sm:text-9xl">404</p>
              <div className="mx-auto mt-4 h-2 w-24 rounded-full bg-primary-content/40" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-14">
            <span className="badge badge-secondary mb-5 w-fit">Page not found</span>
            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Looks like you are lost.
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-base-content/70">
              The page you are looking for may have moved, been removed, or never existed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/" className="btn btn-primary">
                Back to home
              </a>
              <button type="button" className="btn btn-ghost" onClick={() => window.history.back()}>
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
