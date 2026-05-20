const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vbyklhlhzewftbkdnjfa.supabase.co';
const supabaseAnonKey = 'sb_publishable_PRV2Yhi-LuFnEmzo2_rAUw_HKw-uV4e';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Profiles in database:');
    console.log(JSON.stringify(data, null, 2));
  }
}

main();
