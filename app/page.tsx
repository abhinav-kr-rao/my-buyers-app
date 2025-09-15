'use client';

import { useEffect, useState } from "react";
import { createClient } from "./lib/supabase/client"; // Use client instead of server
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const router = useRouter();

  const fetchUser = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();

  }, []);



  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
    else
      setIsLoggedIn(false);

    console.log("User is ", user);

  }, [user]);



  const handleSignIn = async () => {
    router.push('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-bold text-blue-600">
          App
        </div>
        <button onClick={() => handleSignIn()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">BuilderAPP</span>
          </h1>

       

            {isLoggedIn && (
            <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl">
              <p className="text-xl text-gray-700 mb-6 font-semibold">
                You are now signed in! 🎉
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/buyers/new"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                >
                  Add New Buyer
                </Link>
                
                <Link 
                  href="/buyers"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                >
                  View All Buyers
                </Link>
              </div>
            </div>
          )}
           </div>
      </main>


      <footer className="text-center py-8 text-gray-500">
        <p>&copy; Made by Abhinav.</p>
      </footer>
    </div>
  );
}