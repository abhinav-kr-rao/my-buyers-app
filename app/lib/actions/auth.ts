import { useState } from "react";
import createClient from "../supabase/middleware";


const getSession = async () => {
    const [session, setSession] = useState(null);

    const supabase = await createClient.getUser();
}