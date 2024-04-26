import { createClient } from '@supabase/supabase-js'
const URL = 'https://mouafaipfagnffvfhlhs.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWFmYWlwZmFnbmZmdmZobGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTk4MDIsImV4cCI6MjAyODQzNTgwMn0.Of7ERF6C0sF8ehQM9OBBNmPPRlw0Re5yoL5jyi3u3s4';

export const supabase = createClient(URL, API_KEY);
