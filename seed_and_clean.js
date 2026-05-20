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
  console.log('1. Deleting Mia/mIA from team_members...');
  const { data: deleteData, error: deleteError } = await supabase
    .from('team_members')
    .delete()
    .ilike('name', 'mia')
    .select();

  if (deleteError) {
    console.error('Error deleting Mia:', deleteError);
  } else {
    console.log('Successfully deleted Mia:', deleteData);
  }

  console.log('2. Seeding default founders...');
  const { data: seedData, error: seedError } = await supabase
    .from('team_members')
    .insert(defaultFounders)
    .select();

  if (seedError) {
    console.error('Error seeding founders:', seedError);
  } else {
    console.log('Successfully seeded default founders:', seedData);
  }
}

main();
