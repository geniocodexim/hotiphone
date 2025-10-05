import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvienllqtmqdymzzrnwe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52aWVubGxxdG1xZHltenpybndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MzczMTUsImV4cCI6MjA3NTExMzMxNX0.SQgV-wZtK25fCNmPIDmANIEtSCOI7GcWSNPjemMb86M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);