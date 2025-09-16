'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Implement logout logic here
        setIsLoggedIn(false);
    }
    return (
        <nav className="w-full h-16 bg-gray-800 text-white flex items-center px-4 justify-around">
            <div className="flex items-center space-x-4">
                <Link href="/" className="hover:text-gray-400">Home</Link>

                {isLoggedIn ? (
                    <button onClick={handleLogout} className="hover:text-gray-400">
                        Logout
                    </button>
                ) : (<Link href="/login" className="hover:text-gray-400">Sign In</Link>)}
            </div>
        </nav>
    )
}

export default Navbar