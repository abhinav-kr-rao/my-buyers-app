'use client';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Check your email for the login link!');
        }
    };


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border p-2 mb-2 w-full"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
                Send Magic Link
            </button>
            <p>{message}</p>
        </div>
    );
}