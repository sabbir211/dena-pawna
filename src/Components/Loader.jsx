import React from 'react'

export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <div
        aria-hidden="true"
        className="loading loading-spinner loading-lg text-primary"
      />
      <p>
        Server is hosted on Render&apos;s free tier, so the first load can take a
        little longer. Please wait until loading is complete.
      </p>
    </div>
  )
}
