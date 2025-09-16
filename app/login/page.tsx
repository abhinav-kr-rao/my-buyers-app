'use client'
import React, { useEffect, useState } from 'react';
import createClientForBrowser from '../utils/supabase/client';

const Page = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email submitted:', email);



        const supabase = await createClientForBrowser()

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
        })

        if (error) {
            console.log('error', error)


            console.log("Sign-in data:", data);

        };

    }
    useEffect(() => {

        const getSession = async () => {
            const supabase = await createClientForBrowser()
            const { data: user, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Error fetching user:", error);
            }

            if (user) {
                console.log("User data:", user);

            }
        }

        console.log("Fetching session...");

        getSession();
    }, [])


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80 p-6 bg-white shadow-md rounded-md"
            >
                <label htmlFor="email" className="text-lg text-black font-semibold">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};


export default Page;