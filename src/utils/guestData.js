export const guestStatusOptions = [
  { id: 'pending', label: 'Pending', color: 'yellow' },
  { id: 'confirmed', label: 'Confirmed', color: 'green' },
  { id: 'declined', label: 'Declined', color: 'red' },
  { id: 'maybe', label: 'Maybe', color: 'blue' },
];

export const mealPreferences = [
  { id: 'standard', label: 'Standard' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten Free' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
];

export const guestGroups = [
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'colleagues', label: 'Colleagues' },
  { id: 'vip', label: 'VIP' },
];

export const tableAssignments = [
  { id: 1, name: 'Table 1', capacity: 8 },
  { id: 2, name: 'Table 2', capacity: 8 },
  { id: 3, name: 'Table 3', capacity: 8 },
  { id: 4, name: 'Table 4', capacity: 8 },
  { id: 5, name: 'Table 5', capacity: 8 },
];

export const sampleGuests = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    status: 'confirmed',
    group: 'family',
    mealPreference: 'standard',
    tableAssignment: 1,
    plusOne: true,
    notes: 'Best man',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    status: 'pending',
    group: 'friends',
    mealPreference: 'vegetarian',
    tableAssignment: 1,
    plusOne: false,
    notes: 'Allergic to nuts',
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@example.com',
    phone: '+1234567892',
    status: 'confirmed',
    group: 'colleagues',
    mealPreference: 'standard',
    tableAssignment: 2,
    plusOne: true,
    notes: '',
  },
];

export const getStatusColor = (status) => {
  const statusOption = guestStatusOptions.find(opt => opt.id === status);
  return statusOption?.color || 'gray';
};

export const generateGuestId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateGuestEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const getTableAvailability = (guests, tableId) => {
  const table = tableAssignments.find(t => t.id === tableId);
  if (!table) return 0;
  
  const assignedGuests = guests.filter(g => g.tableAssignment === tableId).length;
  return table.capacity - assignedGuests;
};

export const suggestTable = (guests, group) => {
  // Try to seat guests from the same group together
  const groupTables = new Map();
  
  guests.forEach(guest => {
    if (guest.group === group && guest.tableAssignment) {
      groupTables.set(guest.tableAssignment, (groupTables.get(guest.tableAssignment) || 0) + 1);
    }
  });

  // Find table with most guests from the same group that still has space
  let bestTable = null;
  let maxGroupMembers = -1;

  tableAssignments.forEach(table => {
    const availability = getTableAvailability(guests, table.id);
    if (availability > 0) {
      const groupMembers = groupTables.get(table.id) || 0;
      if (groupMembers > maxGroupMembers) {
        maxGroupMembers = groupMembers;
        bestTable = table;
      }
    }
  });

  // If no table found with group members, find first available table
  if (!bestTable) {
    bestTable = tableAssignments.find(table => getTableAvailability(guests, table.id) > 0);
  }

  return bestTable?.id;
};