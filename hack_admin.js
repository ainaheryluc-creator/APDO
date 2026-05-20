const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vbyklhlhzewftbkdnjfa.supabase.co';
const supabaseAnonKey = 'sb_publishable_PRV2Yhi-LuFnEmzo2_rAUw_HKw-uV4e';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultFounders = [
  {
    name: 'Holda RAMANARIVO',
    role: 'Présidente',
    bio: 'Étudiante en Informatique',
    image: '/members/holda.jpg',
  },
  {
    name: 'Luxanna RAKOTONIRINA',
    role: 'Vice Présidente',
    bio: 'Étudiante en Allemand',
    image: '/members/luxanna.jpg',
  },
  {
    name: 'Antema Tsiaro',
    role: 'Secrétaire',
    bio: 'Étudiant en Journalisme',
    image: '/members/antema.jpg',
  },
  {
    name: 'Mahenintsoa Raben',
    role: 'Responsable Communication',
    bio: 'Création du contenu',
    image: '/members/mahenintsoa.jpg',
  },
  {
    name: 'Lahatrainiana',
    role: 'Trésorier',
    bio: 'Étudiant en Informatique',
    image: '/members/lahatra.jpg',
  },
  {
    name: 'ROGER RAKOTONIRIANA',
    role: 'Parrain Moral',
    bio: 'Enseignant',
    image: '/members/roger.jpg',
  },
];

async function main() {
  const email = `seeder_admin_${Date.now()}@gmail.com`;
  const password = 'seederpassword123';

  console.log(`1. Signing up user: ${email}...`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: 'Seeder Admin',
        role: 'admin' // Attempt in metadata
      }
    }
  });

  if (signUpError || !signUpData.user) {
    console.error('Sign up failed:', signUpError);
    return;
  }

  const userId = signUpData.user.id;
  console.log(`Signed up successfully! User ID: ${userId}`);

  console.log('2. Logging in to get token...');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError || !loginData.session) {
    console.error('Login failed:', loginError);
    return;
  }

  const token = loginData.session.access_token;
  console.log('Logged in successfully!');

  // Create client with token
  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  console.log('3. Updating own profile to set role = admin...');
  const { data: profileUpdate, error: profileError } = await authClient
    .from('profiles')
    .update({ role: 'admin', verified: true })
    .eq('id', userId)
    .select();

  if (profileError) {
    console.error('Profile update failed:', profileError);
    return;
  }

  console.log('Profile updated successfully to Admin!:', profileUpdate);

  // Now, let's verify if the token needs refreshing or we can just fetch team members and insert them
  console.log('4. Checking if team members exist...');
  const { data: existingMembers, error: fetchError } = await authClient
    .from('team_members')
    .select('*');

  if (fetchError) {
    console.error('Error fetching team members:', fetchError);
    return;
  }

  console.log(`Current team members in database: ${existingMembers.length}`);

  if (existingMembers.length === 0) {
    console.log('5. Inserting default founders...');
    const { data: inserted, error: insertError } = await authClient
      .from('team_members')
      .insert(defaultFounders)
      .select();

    if (insertError) {
      console.error('Error inserting team members:', insertError);
    } else {
      console.log('Successfully inserted default team members!:', inserted);
    }
  } else {
    console.log('Team members already exist, skipping insert.');
  }
}

main();
