'use client';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { buyerSchema } from '@/app/lib/buyerSchema';
import { z } from 'zod';

export default function NewBuyerPage() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Chandigarh');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const result = buyerSchema.safeParse({
            fullName,
            phone,
            city,
            propertyType: 'Apartment',
            purpose: 'Buy',
            timeline: '0-3m',
            source: 'Website',
        });
        if (!result.success) {
            console.log(result);

            setMessage(result.error.message);
            return;
        }
        const { data: user } = await supabase.auth.getUser();
        if (!user) {
            console.log("Not logged in");

            setMessage('Please log in first.');
            return;
        }
        const { error } = await supabase
            .from('buyers')
            .insert([{ ...result.data, ownerId: user.id }]);
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Buyer added successfully!');
        }
        console.log("Added success");


    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Add New Buyer</h2>
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="border p-2 mb-2 w-full"
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="border p-2 mb-2 w-full"
            />
            <select value={city} onChange={(e) => setCity(e.target.value)} className="border p-2 mb-2 w-full">
                <option value="Chandigarh">Chandigarh</option>
                <option value="Mohali">Mohali</option>
                <option value="Zirakpur">Zirakpur</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Other">Other</option>
            </select>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Buyer
            </button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
