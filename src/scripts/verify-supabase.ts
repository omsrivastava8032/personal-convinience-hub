
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qoktxkflnllfvonneiws.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva3R4a2ZsbmxsZnZvbm5laXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTk3NTgsImV4cCI6MjA2NTQ3NTc1OH0.M8ahNSdUUv3_rCqu8POidcC7dOQy0b89iKWRuyFEdVA";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function verifyConnection() {
    console.log('Verifying Supabase connection...');

    // 1. Test public read access (if any)
    // We'll try to read from 'profiles' table. It might return empty if RLS is strict, but shouldn't throw connection error.
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('Connection failed or RLS blocked read:', error.message);
    } else {
        console.log('Connection successful. Row count query executed.');
    }

    // 2. Check if we can sign in (we can't easily test this without user interaction, but we can check if the client is initialized)
    console.log('Supabase client initialized with URL:', SUPABASE_URL);

    // 3. Simulate an insert (this will likely fail without auth, confirming RLS is active)
    const testId = '00000000-0000-0000-0000-000000000000';
    const { error: insertError } = await supabase.from('profiles').insert({
        id: testId,
        full_name: 'Test User',
    });

    if (insertError) {
        console.log('Insert check (expected failure without auth):', insertError.message);
        if (insertError.message.includes('new row violates row-level security policy')) {
            console.log('SUCCESS: RLS is active and blocking unauthenticated writes.');
        }
    } else {
        console.warn('WARNING: Insert succeeded without auth! RLS might be missing.');
        // Cleanup
        await supabase.from('profiles').delete().eq('id', testId);
    }
}

verifyConnection();
