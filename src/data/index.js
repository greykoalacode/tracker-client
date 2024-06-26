const defaultUserState = {
  isLogged: false,
  user:{
    name: "",
    email: "",
    gender: "",
    age: 0,
    tasks: [],
    habits: [],
    routines: [],
    logs: [],
  },
  exercises: []
};

const equipments = [
  "assisted",
  "band",
  "barbell",
  "body weight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "ez barbell",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "skierg machine",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "tire",
  "trap bar",
  "upper body ergometer",
  "weighted",
  "wheel roller",
];

const bodyparts = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

const targetMuscles = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
];

const bannerContent = [
  {
    emoji: '✔',
    title: 'Manage Tasks',
    content: 'You can add & manage your tasks here'
  },
  {
    emoji: '💯',
    title: 'Ace the Habit game',
    content: 'We got you there. Create your habits with us in one click everyday'
  },
  {
    emoji: '📅',
    title: 'Create logs',
    content: 'Want to note your workouts & monitor them ? Check out logs! '
  },
  {
    emoji: '💪',
    title: 'Import exercises to log',
    content: 'Tired of adding each exercise to a log ? Make a routine and import exercises to your logs'
  },
]


const data = { equipments, bodyparts, targetMuscles, bannerContent, defaultUserState };

export default data;
