// Learning Through Motion - Session Block Data
// Sample session blocks for display (no database required)

import type { SessionBlock } from '@/lib/types/booking';

export const SESSION_BLOCKS: SessionBlock[] = [
  {
    id: '1',
    name: 'January - February 2025 Block',
    description: 'Sunday morning developmental sessions for children aged 5-10 with SEND. Focus on fundamental movement skills, coordination, and confidence building through play and sport.',
    start_date: new Date('2025-01-12'),
    end_date: new Date('2025-02-23'),
    day_of_week: 0, // Sunday
    time_start: '10:00',
    time_end: '10:45',
    capacity: 6,
    current_bookings: 3,
    location: 'Bolton Arena Sports Hall',
    status: 'published',
    registration_fee: 15.00,
    session_fee: 15.00,
    total_sessions: 7,
    created_at: new Date('2024-12-01'),
    updated_at: new Date('2024-12-01'),
  },
  {
    id: '2',
    name: 'March - April 2025 Block',
    description: 'Spring programme focusing on ball skills, teamwork, and social interaction. Designed specifically for children with SEND aged 5-10.',
    start_date: new Date('2025-03-02'),
    end_date: new Date('2025-04-13'),
    day_of_week: 0, // Sunday
    time_start: '10:00',
    time_end: '10:45',
    capacity: 6,
    current_bookings: 1,
    location: 'Bolton Arena Sports Hall',
    status: 'published',
    registration_fee: 15.00,
    session_fee: 15.00,
    total_sessions: 7,
    created_at: new Date('2024-12-01'),
    updated_at: new Date('2024-12-01'),
  },
  {
    id: '3',
    name: 'May - June 2025 Block',
    description: 'Summer term sessions exploring athletics, games, and outdoor activities. Small group environment perfect for building confidence and skills.',
    start_date: new Date('2025-05-04'),
    end_date: new Date('2025-06-15'),
    day_of_week: 0, // Sunday
    time_start: '10:00',
    time_end: '10:45',
    capacity: 6,
    current_bookings: 0,
    location: 'Bolton Arena Sports Hall',
    status: 'published',
    registration_fee: 15.00,
    session_fee: 15.00,
    total_sessions: 7,
    created_at: new Date('2024-12-01'),
    updated_at: new Date('2024-12-01'),
  },
];

// Programme details for the information section
export const PROGRAMME_INFO = {
  duration: '7 weeks',
  sessionLength: '45 minutes',
  groupSize: '6 children maximum',
  ageRange: '5-10 years',
  frequency: 'Once per week',
  pricing: {
    registration: 15.00,
    perSession: 15.00,
    total: 120.00,  // £15 registration + (7 x £15 sessions) = £120
  },
  includes: [
    'Expert coaching from SEND-trained professionals',
    'Small group environment (max 6 children)',
    '7 x 45-minute sessions',
    'All equipment provided',
    'Progress tracking and feedback',
    'Safe, inclusive environment',
  ],
  whatsIncluded: [
    {
      title: 'Small Group Sizes',
      description: 'Maximum 6 children per session ensures every child receives individual attention and support from our experienced coaches.',
      icon: '👥',
    },
    {
      title: '7-Week Programmes',
      description: 'Structured programmes allow children to build confidence, develop skills progressively, and see real progress over time.',
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
      answer: 'Our sessions are designed for children aged 5-10 years with SEND. We create a supportive environment where every child can participate at their own level.',
    },
    {
      question: 'How many children are in each session?',
      answer: 'We keep our groups small with a maximum of 6 children per session. This ensures each child receives individual attention and support.',
    },
    {
      question: 'What does the registration fee cover?',
      answer: 'The £15 registration fee at the start of each block secures your child\'s place on the programme. Sessions are then £15 each, with blocks running for 6 or 7 weeks.',
    },
    {
      question: 'Can I try a session before committing?',
      answer: 'Yes! We offer free trial sessions so your child can experience our approach before you book. Contact us to arrange a trial.',
    },
    {
      question: 'What if my child needs to miss a session?',
      answer: 'We understand that sometimes children need to miss sessions. Please let us know in advance and we\'ll work with you to arrange a make-up session where possible.',
    },
  ],
};
