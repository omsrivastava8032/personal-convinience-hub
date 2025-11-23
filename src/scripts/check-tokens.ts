
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qoktxkflnllfvonneiws.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva3R4a2ZsbmxsZnZvbm5laXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTk3NTgsImV4cCI6MjA2NTQ3NTc1OH0.M8ahNSdUUv3_rCqu8POidcC7dOQy0b89iKWRuyFEdVA";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function checkCalendarToken() {
    console.log('Checking for Google Calendar tokens...');

    // We can't query the table directly without a user session due to RLS.
    // But we can try to sign in or just check if the table is accessible.
    // Since we are running this as a script without user auth, we might hit RLS.
    // However, if we can't check, we can at least verify the table exists.

    const { count, error } = await supabase.from('google_calendar_integrations').select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error checking tokens table:', error.message);
    } else {
        console.log(`Table 'google_calendar_integrations' is accessible. Total rows (visible): ${count}`);
    }
}

checkCalendarToken();
