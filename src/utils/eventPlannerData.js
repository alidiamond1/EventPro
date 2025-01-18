export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return {
    id: `${hour}00`,
    time: `${hour}:00`,
    label: `${hour}:00${i < 12 ? ' AM' : ' PM'}`
  };
});

export const activityTypes = [
  { id: 'ceremony', label: 'Ceremony', icon: '💒' },
  { id: 'meal', label: 'Meal Service', icon: '🍽️' },
  { id: 'speech', label: 'Speeches', icon: '🎤' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎵' },
  { id: 'photo', label: 'Photography', icon: '📸' },
  { id: 'break', label: 'Break/Setup', icon: '⏰' },
  { id: 'welcome', label: 'Welcome/Reception', icon: '👋' },
  { id: 'departure', label: 'Departure', icon: '👋' },
];

export const locationTypes = [
  { id: 'mainHall', label: 'Main Hall' },
  { id: 'garden', label: 'Garden' },
  { id: 'ballroom', label: 'Ballroom' },
  { id: 'lobby', label: 'Lobby' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'chapel', label: 'Chapel' },
  { id: 'diningRoom', label: 'Dining Room' },
  { id: 'conferenceRoom', label: 'Conference Room' },
];

export const sampleItinerary = {
  id: 'sample-wedding',
  name: 'Sample Wedding Itinerary',
  date: '2024-06-15',
  activities: [
    {
      id: '1',
      time: '14:00',
      type: 'welcome',
      title: 'Guest Arrival',
      location: 'lobby',
      duration: 60,
      notes: 'Welcome drinks served'
    },
    {
      id: '2',
      time: '15:00',
      type: 'ceremony',
      title: 'Wedding Ceremony',
      location: 'chapel',
      duration: 60,
      notes: 'Processional starts promptly'
    },
    {
      id: '3',
      time: '16:00',
      type: 'photo',
      title: 'Photography Session',
      location: 'garden',
      duration: 60,
      notes: 'Family and couple photos'
    },
    {
      id: '4',
      time: '17:00',
      type: 'meal',
      title: 'Reception Dinner',
      location: 'ballroom',
      duration: 120,
      notes: 'Three-course meal service'
    },
    {
      id: '5',
      time: '19:00',
      type: 'entertainment',
      title: 'First Dance & Party',
      location: 'ballroom',
      duration: 180,
      notes: 'Live band performance'
    },
  ]
};