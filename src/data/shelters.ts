export interface Shelter {
  id: string;
  name: string;
  distance: string;
  distanceValue: number;
  isOpen: boolean;
  bedsAvailable: number;
  totalBeds: number;
  amenities: {
    beds: boolean;
    wifi: boolean;
    food: boolean;
    medical: boolean;
    nightStay: boolean;
  };
  filters: string[];
  phone: string;
  address: string;
  description: string;
  imageUrl: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Hope Haven Shelter',
    distance: '0.8 km',
    distanceValue: 0.8,
    isOpen: true,
    bedsAvailable: 12,
    totalBeds: 30,
    amenities: {
      beds: true,
      wifi: true,
      food: true,
      medical: false,
      nightStay: true,
    },
    filters: ['All', 'Family', 'Open Now'],
    phone: '(555) 123-4567',
    address: '123 Main Street, Downtown',
    description:
      'A safe, welcoming environment providing emergency shelter, meals, and supportive services for families and individuals experiencing homelessness. Our dedicated staff works around the clock to ensure every guest receives the care and dignity they deserve.',
    imageUrl: 'shelter-interior',
    hours: 'Open 24 Hours',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: '2',
    name: "Safe Harbor Women's Center",
    distance: '1.2 km',
    distanceValue: 1.2,
    isOpen: true,
    bedsAvailable: 5,
    totalBeds: 20,
    amenities: {
      beds: true,
      wifi: true,
      food: true,
      medical: true,
      nightStay: true,
    },
    filters: ['All', 'Women-Only', 'Open Now'],
    phone: '(555) 234-5678',
    address: '456 Oak Avenue, Midtown',
    description:
      'Dedicated to providing safe shelter and comprehensive support services exclusively for women in need. Services include counseling, job placement assistance, and health care referrals.',
    imageUrl: 'women-shelter',
    hours: 'Open 24 Hours',
    coordinates: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: '3',
    name: 'Paws & People Refuge',
    distance: '2.1 km',
    distanceValue: 2.1,
    isOpen: true,
    bedsAvailable: 8,
    totalBeds: 15,
    amenities: {
      beds: true,
      wifi: false,
      food: true,
      medical: false,
      nightStay: true,
    },
    filters: ['All', 'Pet-Friendly', 'Family', 'Open Now'],
    phone: '(555) 345-6789',
    address: '789 Elm Street, Westside',
    description:
      'One of the few shelters that welcomes both individuals and their beloved pets, ensuring families stay together. Pet food and veterinary referrals are available.',
    imageUrl: 'pet-friendly-shelter',
    hours: '6:00 AM - 10:00 PM',
    coordinates: { lat: 37.7649, lng: -122.4294 },
  },
  {
    id: '4',
    name: 'Community First Center',
    distance: '3.5 km',
    distanceValue: 3.5,
    isOpen: false,
    bedsAvailable: 0,
    totalBeds: 40,
    amenities: {
      beds: true,
      wifi: true,
      food: true,
      medical: true,
      nightStay: true,
    },
    filters: ['All', 'Family'],
    phone: '(555) 456-7890',
    address: '321 Pine Road, Eastside',
    description:
      'Large capacity shelter providing emergency housing and wraparound services. Offers medical screenings, mental health support, and case management.',
    imageUrl: 'community-center',
    hours: '6:00 PM - 8:00 AM',
    coordinates: { lat: 37.7549, lng: -122.3994 },
  },
  {
    id: '5',
    name: 'Family Bridge House',
    distance: '4.0 km',
    distanceValue: 4.0,
    isOpen: true,
    bedsAvailable: 3,
    totalBeds: 25,
    amenities: {
      beds: true,
      wifi: true,
      food: true,
      medical: false,
      nightStay: true,
    },
    filters: ['All', 'Family', 'Open Now'],
    phone: '(555) 567-8901',
    address: '654 Maple Drive, Northside',
    description:
      'Specialized in serving families with children, offering private family rooms and childcare support. Educational programs and tutoring available for children.',
    imageUrl: 'family-shelter',
    hours: 'Open 24 Hours',
    coordinates: { lat: 37.7949, lng: -122.4394 },
  },
];

export const emergencyContacts = [
  {
    id: 'national-hotline',
    name: 'National Homeless Hotline',
    phone: '1-800-555-0199',
    description: '24/7 support for individuals experiencing homelessness',
  },
  {
    id: 'crisis-line',
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free 24/7 crisis counseling via text',
  },
  {
    id: 'domestic-violence',
    name: 'Domestic Violence Hotline',
    phone: '1-800-799-7233',
    description: '24/7 confidential support for domestic violence',
  },
  {
    id: 'substance-abuse',
    name: 'SAMHSA Helpline',
    phone: '1-800-662-4357',
    description: 'Free referrals and information on mental health and substance use',
  },
];

export const safetyTips = [
  {
    id: 'tip-1',
    title: 'Stay in Well-Lit Areas',
    description: 'When walking at night, stick to well-lit streets and populated areas.',
  },
  {
    id: 'tip-2',
    title: 'Keep Important Documents Safe',
    description: 'Store ID, medical records, and important paperwork in a waterproof bag.',
  },
  {
    id: 'tip-3',
    title: 'Know Your Resources',
    description: 'Familiarize yourself with local shelters, food banks, and health clinics.',
  },
  {
    id: 'tip-4',
    title: 'Stay Connected',
    description: 'Many libraries and community centers offer free phone charging and WiFi.',
  },
  {
    id: 'tip-5',
    title: 'Protect Your Health',
    description: 'Visit free clinics for regular checkups. Many shelters offer health screenings.',
  },
];
