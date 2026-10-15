import  Link  from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen bg-black flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            404
        </h1>
        <p className="mt-6 text-base leading-7 font-medium text-gray-300">
            This page does not exist.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                href="/events"    
            className="rounded-md bg-red-600/70 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                Go back to events
            </Link>
        </div>
    </div>
  );
}