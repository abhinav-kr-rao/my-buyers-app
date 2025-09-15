import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../lib/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = await createClient();
    const { user, error } = await supabase.auth.getUser();
    if (error) {
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({ user });
}
