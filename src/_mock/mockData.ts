// mockData.ts

import { ITourItem, ITourBooker, IPeople } from '../types/tour';

export const mockPeople: IPeople[] = [
  {
    id: '1',
    name: 'AMLO',
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    phoneNumber: '1234567890',
  },
  {
    id: '2',
    name: 'Leon',
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    phoneNumber: '1234567891',
  },
  // ... more people
];

export const mockTourBookers: ITourBooker[] = [
  { id: '1', name: 'Booker1', avatarUrl: 'booker1.png', guests: 2 },
  { id: '2', name: 'Booker2', avatarUrl: 'booker2.png', guests: 5 },
  // ... more bookers
];

export const mockTourItem: ITourItem = {
  id: '1',
  name: 'Palacio Nacional',
  socials: {
    facebook: 'facebook',
    twitter: 'twitter',
    instagram: 'instagram',
    linkedin: 'linkedin',
    threads: 'threads',
  },
  totalViews: 1500,
  tags: ['CDMX', 'VoyXMexico'],
  content:
    'No podemos quedarnos sentados en Palacio Nacional esperando a que lleguen las inversiones ¡Hay que ir a buscarlas!',
  publish: 'draft',
  images: ['https://img.ayrshare.com/012/gb.jpg'],
  durations: '3 days',
  priceSale: 180,
  services: ['service1', 'service2'],
  destination: 'destination1',
  ratingNumber: 4.5,
  bookers: mockTourBookers,
  people: mockPeople,
  createdAt: new Date(),
  available: {
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date()
  },
};
