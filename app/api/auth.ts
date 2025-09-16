import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user, error } = await supabase.auth.getUser();
    if (error) {
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({ user });
}
