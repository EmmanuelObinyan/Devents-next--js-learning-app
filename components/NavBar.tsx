import React from 'react'
import Link from 'next/link'
const NavBar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
            <img src="/web/icons/logo.png" alt="logo" width={24} height={24} />

             <p>DevEvents</p>
             </Link>

             <ul >
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/">Create Event</Link>
             </ul>
        </nav>
    </header>
  )
}

export default NavBar