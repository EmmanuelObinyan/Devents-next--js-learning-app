'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-screen  flex-col items-center justify-center p-24">
      <h2 className="text-xl  mb-4 font-semibold capitalize">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => retry()
        } 
        className="rounded-md transition-all ease-in-out duration-200 bg-red-600/70 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Try again !
      </button>
    </div>
  )
}