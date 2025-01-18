export const venues = [
  {
    id: 1,
    name: "Grand Ballroom",
    type: "wedding",
    location: "Downtown",
    capacity: 300,
    priceRange: "$$$$",
    rating: 4.8,
    images: ["/venue1.jpg"],
    amenities: ["Parking", "Catering", "WiFi", "Sound System"],
    description: "Elegant ballroom perfect for grand weddings and celebrations.",
    basePrice: 5000,
  },
  {
    id: 2,
    name: "Tech Hub Conference Center",
    type: "corporate",
    location: "Business District",
    capacity: 200,
    priceRange: "$$$",
    rating: 4.5,
    images: ["/venue2.jpg"],
    amenities: ["AV Equipment", "WiFi", "Catering", "Breakout Rooms"],
    description: "Modern conference center with state-of-the-art facilities.",
    basePrice: 3000,
  },
  {
    id: 3,
    name: "Garden Paradise",
    type: "party",
    location: "Suburb",
    capacity: 150,
    priceRange: "$$",
    rating: 4.6,
    images: ["/venue3.jpg"],
    amenities: ["Outdoor Space", "BBQ Area", "Parking", "Basic Sound System"],
    description: "Beautiful garden venue perfect for outdoor events.",
    basePrice: 2000,
  },
];

export const vendors = [
  {
    id: 1,
    name: "Elite Catering",
    type: "catering",
    location: "City Center",
    priceRange: "$$$",
    rating: 4.9,
    services: ["Full Service", "Buffet", "Plated Meals", "Beverages"],
    description: "Premium catering service for all types of events.",
    basePrice: 75, // per person
  },
  {
    id: 2,
    name: "Sound Masters",
    type: "entertainment",
    location: "Metro Area",
    priceRange: "$$",
    rating: 4.7,
    services: ["DJ", "Live Band", "Sound Equipment", "Lighting"],
    description: "Complete entertainment solutions for your event.",
    basePrice: 1500,
  },
  {
    id: 3,
    name: "Floral Dreams",
    type: "decoration",
    location: "Downtown",
    priceRange: "$$",
    rating: 4.8,
    services: ["Floral Arrangements", "Venue Decoration", "Theme Design"],
    description: "Creating beautiful spaces for memorable events.",
    basePrice: 1000,
  },
];

export const eventTypes = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'party', label: 'Party' },
  { id: 'conference', label: 'Conference' },
];

export const priceRanges = [
  { id: '$', label: 'Budget', maxPrice: 1000 },
  { id: '$$', label: 'Moderate', maxPrice: 2500 },
  { id: '$$$', label: 'Premium', maxPrice: 5000 },
  { id: '$$$$', label: 'Luxury', maxPrice: 10000 },
];