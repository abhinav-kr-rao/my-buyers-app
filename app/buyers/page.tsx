
import { createClient } from "../lib/supabase/client";
import { useEffect, useState } from 'react';

export default function BuyersPage() {
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        const fetchBuyers = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('buyers').select('*').order('updatedAt', { ascending: false });
            if (!error) setBuyers(data);
            else return;

            console.log(data);

        };
        fetchBuyers();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Buyers</h2>
            <ul>
                {buyers.map((buyer) => (
                    <li key={buyer.id} className="border p-2 mb-2">
                        {buyer.fullName} - {buyer.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}
