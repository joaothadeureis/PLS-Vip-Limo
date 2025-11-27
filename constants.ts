import { Service, Vehicle } from './types';

export const SERVICES: Service[] = [
  {
    id: 'city-tour',
    title: 'City Tour Services',
    description: 'Explore the Bay Area like never before. Our chauffeurs — long-time residents who know every landmark and hidden gem — guide you through scenic viewpoints, cultural attractions, and iconic locations, giving you an unforgettable and personalized tour.',
    image: '/CITY TOUR SERVICES.webp'
  },
  {
    id: 'airport',
    title: 'Airport Transfers',
    description: 'Navigating airport logistics can be stressful — we make it seamless. Our airport transfer service guarantees on-time pickups and drop-offs, with real-time flight tracking to accommodate schedule changes. Whether arriving or departing, your ride will always be waiting.',
    image: '/AIRPORT TRANSFERS.webp'
  },
  {
    id: 'corporate',
    title: 'Corporate Transportation',
    description: 'Impress clients and maintain productivity on the move. Our corporate transportation service provides a refined, quiet, and comfortable environment — ideal for preparing for meetings, relaxing between engagements, or transporting executives with professionalism.',
    image: '/CORPORATE TRANSPORTATION.webp'
  },
  {
    id: 'wedding',
    title: 'Wedding Services',
    description: 'Make every celebration extraordinary. From weddings and proms to concerts and sporting events, our luxury transportation adds elegance and ensures you arrive with style and comfort.',
    image: '/WEDDING SERVICES.webp'
  }
];

export const FLEET: Vehicle[] = [
  {
    id: 'xts',
    name: 'Cadillac XTS',
    category: 'Luxury Sedan',
    capacity: { passengers: 3, luggage: 3 },
    description: 'Seats: 3 | Minimum 3 Hrs',
    image: '/CADILLAC XTS.webp'
  },
  {
    id: 's550',
    name: 'Mercedes S-550',
    category: 'Luxury Sedan',
    capacity: { passengers: 3, luggage: 3 },
    description: 'Seats: 3 | Minimum 3 Hrs',
    image: '/MERCEDES-S-550.webp'
  },
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    category: 'SUV',
    capacity: { passengers: 6, luggage: 6 },
    description: 'Seats: 6 | Minimum 3 Hrs',
    image: '/CHEVROLET-SUBURBAN-preto.webp'
  },
  {
    id: 'escalade',
    name: 'Cadillac Escalade',
    category: 'Premium SUV',
    capacity: { passengers: 6, luggage: 6 },
    description: 'Seats: 6 | Minimum 6 Hrs',
    image: '/Cadillac-Escalade-Preta_diant.-dir (1).webp'
  },
  {
    id: 'tesla',
    name: 'Tesla Model S',
    category: 'Electric Luxury',
    capacity: { passengers: 4, luggage: 3 },
    description: 'Seats: 4 | Minimum 4 Hrs',
    image: '/tesla model s.webp'
  },
  {
    id: 'sprinter',
    name: 'Mercedes-Benz Sprinter',
    category: 'Van',
    capacity: { passengers: 14, luggage: 14 },
    description: 'Seats: 14 | Minimum 3 Hrs',
    image: '/MERCEDES-BENZ SPRINTER.webp'
  },
  {
    id: 'partybus',
    name: 'Party Bus',
    category: 'Bus',
    capacity: { passengers: 30, luggage: 10 },
    description: 'Seats: 30 | Minimum 3 Hrs',
    image: '/PARTY-BUS.webp'
  },
  {
    id: 'shuttlebus',
    name: 'Shuttle Bus',
    category: 'Bus',
    capacity: { passengers: 36, luggage: 36 },
    description: 'Seats: 36 | Minimum 3 Hrs',
    image: '/8-Shuttle-Bus (1).webp'
  },
  {
    id: 'motorcoach',
    name: 'Motor Coach',
    category: 'Coach',
    capacity: { passengers: 55, luggage: 55 },
    description: 'Seats: 55 | Minimum 3 Hrs',
    image: '/MOTOR COACH.webp'
  }
];

export const FEATURES = [
  {
    title: 'Safety First',
    description: 'Professionally trained chauffeurs, a fully licensed fleet and continuous route monitoring.',
    icon: 'shield'
  },
  {
    title: 'Transparent & Fair Rates',
    description: 'Premium service with honest pricing and no hidden fees.',
    icon: 'check'
  },
  {
    title: 'Modern Luxury Fleet',
    description: 'Sedans, SUVs, Sprinters and specialty vehicles — always pristine and meticulously maintained.',
    icon: 'star'
  }
];