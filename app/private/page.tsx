import { redirect } from 'next/navigation'

import { supabase } from '../lib/supabase/client'

export default async function PrivatePage() {
    // const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/signin')
    }

    return <p>Hello {data.user.email}</p>
}