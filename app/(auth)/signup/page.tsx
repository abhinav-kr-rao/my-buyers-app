'use client';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleSignup = async () => {
        console.log(email);

        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            console.log(error);

            setMessage(error.message);
        } else {
            setMessage('Check your email to confirm your signup!');
        }
    };


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Signup</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border p-2 mb-2 w-full"
            />
            <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded">
                Sign Up
            </button>
            <p>{message}</p>
        </div>
    );
}