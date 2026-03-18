import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snlvotghpmwmrknkiroy.supabase.co';
const supabaseKey = 'sb_publishable_iJtoYMs1MrLi5BWWBWxv8w_82OVH0OR';

export const supabase = createClient(supabaseUrl, supabaseKey);
