// Learning Through Motion - Session Block Data
// Weekend Sensory Sessions at Bishop Bridgeman C.E. Primary School

import type { SessionBlock } from '@/lib/types/booking';

export const SESSION_BLOCKS: SessionBlock[] = [
  {
    id: '1',
    name: 'January - February Block',
    description: 'Weekend sensory sessions for children aged 4-12. Focus on proprioception, interoception, and regulation through carefully designed physical activities.',
    start_date: new Date('2026-01-11'),
    end_date: new Date('2026-02-22'),
    day_of_week: 6, // Saturday
    time_start: '09:00',
    time_end: '12:00',
    capacity: 6,
    current_bookings: 0,
    location: 'Bishop Bridgeman C.E. Primary School',
    status: 'published',
    registration_fee: 10.00,
    session_fee: 15.00,
    total_sessions: 7,
    created_at: new Date('2025-12-01'),
    updated_at: new Date('2025-12-01'),
  },
  {
    id: '2',
    name: 'March - April Block',
    description: 'Spring programme with 6 weeks of sensory development (adjusted for Easter Sunday). Focus on building body awareness, coordination, and emotional regulation.',
    start_date: new Date('2026-03-01'),
    end_date: new Date('2026-04-12'),
    day_of_week: 6, // Saturday
    time_start: '09:00',
    time_end: '12:00',
    capacity: 6,
    current_bookings: 0,
    location: 'Bishop Bridgeman C.E. Primary School',
    status: 'published',
    registration_fee: 10.00,
    session_fee: 15.00,
    total_sessions: 6,
    created_at: new Date('2025-12-01'),
    updated_at: new Date('2025-12-01'),
  },
  {
    id: '3',
    name: 'April - May Block',
    description: 'Summer term sessions continuing sensory development work. Small group environment perfect for building confidence and foundational skills.',
    start_date: new Date('2026-04-19'),
    end_date: new Date('2026-05-31'),
    day_of_week: 6, // Saturday
    time_start: '09:00',
    time_end: '12:00',
    capacity: 6,
    current_bookings: 0,
    location: 'Bishop Bridgeman C.E. Primary School',
    status: 'published',
    registration_fee: 10.00,
    session_fee: 15.00,
    total_sessions: 7,
    created_at: new Date('2025-12-01'),
    updated_at: new Date('2025-12-01'),
  },
];

// Session times available each week
export const SESSION_TIMES = [
  '9:00 - 9:45',
  '9:45 - 10:30',
  '10:30 - 11:15',
  '11:15 - 12:00',
];

// Programme details for the information section
export const PROGRAMME_INFO = {
  duration: '6-7 weeks per block',
  sessionLength: '45 minutes',
  groupSize: '6 children maximum',
  ageRange: '4-12 years',
  frequency: 'Once per week',
  location: 'Bishop Bridgeman C.E. Primary School',
  pricing: {
    registration: 10.00,       // One-time fee (not per block)
    perSessionPayAsYouGo: 15.00,
    perSessionFullBlock: 12.00,
  },
  includes: [
    'Expert coaching from SEND-trained professionals',
    'Small group environment (max 6 children)',
    '45-minute focused sessions',
    'All equipment provided',
    'Progress tracking and feedback',
    'Safe, inclusive environment',
    'Parent involvement welcomed',
  ],
  whatsIncluded: [
    {
      title: 'Small Group Sizes',
      description: 'Maximum 6 children per session ensures every child receives individual attention and support from our experienced coaches.',
      icon: '👥',
    },
    {
      title: 'Block Programmes',
      description: 'Sessions run in half-termly blocks (6-7 weeks), allowing children to build confidence and develop skills progressively.',
      icon: '📅',
    },
    {
      title: 'Expert Coaching',
      description: 'Our coaches are trained in working with children with SEND, creating an inclusive, supportive environment where every child can succeed.',
      icon: '⭐',
    },
  ],
  faqs: [
    {
      question: 'What age groups do you cater for?',
      answer: 'Our weekend sessions are designed for children aged 4-12 years. We create a supportive environment where every child can participate at their own level.',
    },
    {
      question: 'How many children are in each session?',
      answer: 'We keep our groups small with a maximum of 6 children per 45-minute session. This ensures each child receives individual attention and support.',
    },
    {
      question: 'What does the registration fee cover?',
      answer: 'The £10 registration fee is a one-time payment when you first join. You don\'t need to pay this again each time you join a new block.',
    },
    {
      question: 'What are the pricing options?',
      answer: 'Sessions are £15 each on a pay-as-you-attend basis, or £12 per session if you book the full block upfront. The one-time registration fee is £10.',
    },
    {
      question: 'Can I try a session before committing?',
      answer: 'Yes! We offer taster sessions so your child can experience our approach before you book. Contact us to arrange a trial.',
    },
    {
      question: 'What if my child needs to miss a session?',
      answer: 'We understand that sometimes children need to miss sessions. Please let us know in advance and we\'ll work with you to arrange a make-up session where possible.',
    },
  ],
};
