import { createClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

const url: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

const supabase = createClient<Database>(url, key);

export default supabase;