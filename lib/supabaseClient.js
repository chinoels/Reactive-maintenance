// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qxwropgfiqhqmtljjezr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4d3JvcGdmaXFocW10bGpqZXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjQzMDMsImV4cCI6MjA2OTQ0MDMwM30.gQTW4eb9hTj5H0lpptpkhi0y7LpzbKWWvPJv9aJYjQQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
