// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mybmibokkxxbxrrokcfo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Ym1pYm9ra3h4Ynhycm9rY2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTExODUsImV4cCI6MjA2MDU4NzE4NX0._4FpfxkftLmxBjDI8VyHS6cq6jVCGEykatt9OyuzRmY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);