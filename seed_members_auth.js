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
  console.log('Logging in as admin...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin1@gmail.com',
    password: 'admin123'
  });

  if (authError || !authData.session) {
    console.error('Failed to login as admin:', authError);
    return;
  }

  const token = authData.session.access_token;
  console.log('Login successful! Token acquired.');

  // Create client with auth token
  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  // Check if members already exist
  const { data: existing, error: fetchError } = await authClient
    .from('team_members')
    .select('*');

  if (fetchError) {
    console.error('Error fetching members:', fetchError);
    return;
  }

  console.log(`Found ${existing.length} existing team members.`);
  
  if (existing.length === 0) {
    console.log('Seeding default team members...');
    const { data: inserted, error: insertError } = await authClient
      .from('team_members')
      .insert(defaultFounders)
      .select();

    if (insertError) {
      console.error('Error seeding founders:', insertError);
    } else {
      console.log('Successfully seeded default founders:', inserted);
    }
  } else {
    console.log('Team members already exist, no seeding needed.');
  }
}

main();
