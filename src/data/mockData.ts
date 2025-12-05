import type {
  User,
  Opportunity,
  Booking,
  BusinessPool,
  ChainTransaction,
  MarketIntervention,
  Notification,
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'worker',
    reliabilityGrade: 1,
    utilization: 87,
    totalBookings: 156,
    completedBookings: 154,
    rating: 4.9,
  },
  {
    id: 'user-2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'worker',
    reliabilityGrade: 2,
    utilization: 72,
    totalBookings: 98,
    completedBookings: 96,
    rating: 4.7,
  },
  {
    id: 'user-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'worker',
    reliabilityGrade: 3,
    utilization: 65,
    totalBookings: 45,
    completedBookings: 43,
    rating: 4.5,
  },
  {
    id: 'business-1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    role: 'business',
    reliabilityGrade: 1,
    utilization: 0,
    totalBookings: 0,
    completedBookings: 0,
    rating: 4.8,
  },
];

// Mock Opportunities
export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Senior Software Developer',
    description: 'Looking for an experienced React developer to help with a new project launch. Must have 3+ years of experience with modern frontend frameworks.',
    businessId: 'business-1',
    businessName: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    startTime: new Date('2025-12-10T09:00:00'),
    endTime: new Date('2025-12-10T17:00:00'),
    hourlyRate: 85,
    requiredGrade: 2,
    status: 'open',
    category: 'Technology',
  },
  {
    id: 'opp-2',
    title: 'Marketing Coordinator',
    description: 'Need a creative marketing professional to coordinate our holiday campaign. Experience with social media and content creation required.',
    businessId: 'business-1',
    businessName: 'BrandWorks Inc',
    location: 'New York, NY',
    startTime: new Date('2025-12-08T10:00:00'),
    endTime: new Date('2025-12-08T18:00:00'),
    hourlyRate: 65,
    requiredGrade: 3,
    status: 'open',
    category: 'Marketing',
  },
  {
    id: 'opp-3',
    title: 'Data Analyst - Urgent',
    description: 'Immediate need for data analyst to help with quarterly reporting. Must be proficient in SQL and Python.',
    businessId: 'business-1',
    businessName: 'DataDrive Analytics',
    location: 'Austin, TX',
    startTime: new Date('2025-12-06T08:00:00'),
    endTime: new Date('2025-12-06T16:00:00'),
    hourlyRate: 75,
    requiredGrade: 1,
    status: 'open',
    category: 'Analytics',
  },
  {
    id: 'opp-4',
    title: 'Customer Success Manager',
    description: 'Support our growing customer base with onboarding and training. Excellent communication skills required.',
    businessId: 'business-1',
    businessName: 'ServiceFirst',
    location: 'Remote',
    startTime: new Date('2025-12-12T09:00:00'),
    endTime: new Date('2025-12-12T17:00:00'),
    hourlyRate: 55,
    requiredGrade: 4,
    status: 'open',
    category: 'Customer Service',
  },
  {
    id: 'opp-5',
    title: 'UX Designer',
    description: 'Design new user interfaces for our mobile app. Portfolio review required.',
    businessId: 'business-1',
    businessName: 'DesignHub',
    location: 'Seattle, WA',
    startTime: new Date('2025-12-15T10:00:00'),
    endTime: new Date('2025-12-15T18:00:00'),
    hourlyRate: 90,
    requiredGrade: 2,
    status: 'filled',
    category: 'Design',
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    opportunityId: 'opp-1',
    workerId: 'user-1',
    businessId: 'business-1',
    status: 'confirmed',
    startTime: new Date('2025-12-10T09:00:00'),
    endTime: new Date('2025-12-10T17:00:00'),
    totalAmount: 680,
  },
  {
    id: 'booking-2',
    opportunityId: 'opp-2',
    workerId: 'user-2',
    businessId: 'business-1',
    status: 'in-progress',
    startTime: new Date('2025-12-08T10:00:00'),
    endTime: new Date('2025-12-08T18:00:00'),
    totalAmount: 520,
  },
];

// Mock Business Pools
export const mockBusinessPools: BusinessPool[] = [
  {
    id: 'pool-1',
    name: 'Tech Specialists',
    description: 'Our go-to team for software development and technical projects',
    businessId: 'business-1',
    workers: ['user-1', 'user-2'],
    createdAt: new Date('2025-01-15'),
  },
  {
    id: 'pool-2',
    name: 'Marketing Team',
    description: 'Creative professionals for marketing and content needs',
    businessId: 'business-1',
    workers: ['user-3'],
    createdAt: new Date('2025-02-01'),
  },
];

// Mock Chain Transactions
export const mockChainTransactions: ChainTransaction[] = [
  {
    id: 'chain-1',
    name: 'Product Launch Sequence',
    steps: [
      { id: 'step-1', order: 1, opportunityId: 'opp-1' },
      { id: 'step-2', order: 2, opportunityId: 'opp-2', dependsOn: 'step-1' },
      { id: 'step-3', order: 3, opportunityId: 'opp-4', dependsOn: 'step-2' },
    ],
    status: 'active',
    createdBy: 'business-1',
    createdAt: new Date('2025-11-20'),
  },
];

// Mock Market Interventions
export const mockMarketInterventions: MarketIntervention[] = [
  {
    id: 'intervention-1',
    type: 'price-adjustment',
    targetCategory: 'Technology',
    targetLocation: 'San Francisco, CA',
    adjustment: 15,
    startDate: new Date('2025-12-01'),
    endDate: new Date('2025-12-31'),
    status: 'active',
    createdBy: 'admin-1',
  },
  {
    id: 'intervention-2',
    type: 'demand-stimulus',
    targetCategory: 'Marketing',
    adjustment: 10,
    startDate: new Date('2025-12-15'),
    endDate: new Date('2026-01-15'),
    status: 'scheduled',
    createdBy: 'admin-1',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'booking',
    title: 'New Booking Confirmed',
    message: 'Your booking for Senior Software Developer has been confirmed',
    read: false,
    createdAt: new Date('2025-12-05T10:30:00'),
    link: '/bookings/booking-1',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'opportunity',
    title: 'New Opportunity Match',
    message: 'A new opportunity matching your skills is available',
    read: false,
    createdAt: new Date('2025-12-05T09:15:00'),
    link: '/opportunities',
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'system',
    title: 'Profile Updated',
    message: 'Your reliability grade has been updated to Grade 1',
    read: true,
    createdAt: new Date('2025-12-04T14:20:00'),
  },
];

// Helper function to get current user (for demo purposes)
export const getCurrentUser = (): User => mockUsers[0];

// Helper function to get user opportunities
export const getUserOpportunities = (_userId: string): Opportunity[] => {
  return mockOpportunities.filter((opp) => opp.status === 'open');
};

// Helper function to get user bookings
export const getUserBookings = (userId: string): Booking[] => {
  return mockBookings.filter((booking) => booking.workerId === userId);
};
