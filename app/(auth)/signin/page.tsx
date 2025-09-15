'use client';
import { useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Check your email for the login link!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                    <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
                    <p className="text-blue-100 text-center mt-2">Login to BuilderAPP</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                        >
                            Send Magic Link
                        </button>

                        {message && (
                            <div className={`p-4 rounded-lg text-center ${message.includes('Check your email')
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                <p className="font-medium">{message}</p>
                            </div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            We&apos;ll send you a secure login link to your email
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}