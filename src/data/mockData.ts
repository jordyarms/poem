import type {
  User,
  Opportunity,
  Booking,
  BusinessPool,
  ChainTransaction,
  MarketIntervention,
  Notification,
  WorkerRole,
  WorkerAvailabilityPattern,
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

// Mock Worker Roles
export const mockWorkerRoles: WorkerRole[] = [
  {
    id: 'role-1',
    name: 'Senior Software Engineer',
    category: 'Technology',
    issuer: 'TechCorp Solutions',
    status: 'active',
    hourlyRate: 85,
    totalBookings: 45,
    lastBooked: new Date('2025-12-01'),
    requirements: ['5+ years experience', 'React & TypeScript', 'Team leadership'],
    description: 'Lead development of enterprise web applications using modern frameworks',
    qualifications: ['B.S. Computer Science', 'AWS Certified', 'Agile Scrum Master'],
    workerId: 'user-1',
  },
  {
    id: 'role-2',
    name: 'UX/UI Designer',
    category: 'Design',
    issuer: 'DesignHub',
    status: 'active',
    hourlyRate: 75,
    totalBookings: 32,
    lastBooked: new Date('2025-11-28'),
    requirements: ['Portfolio required', 'Figma proficiency', 'User research experience'],
    description: 'Create intuitive user interfaces and conduct usability testing',
    qualifications: ['Design degree', 'Adobe Creative Suite', '3+ years UX'],
    workerId: 'user-1',
  },
  {
    id: 'role-3',
    name: 'Data Analyst',
    category: 'Analytics',
    issuer: 'DataDrive Analytics',
    status: 'active',
    hourlyRate: 70,
    totalBookings: 28,
    lastBooked: new Date('2025-11-25'),
    requirements: ['SQL expert', 'Python/R', 'Statistical analysis'],
    description: 'Analyze business data and create actionable insights',
    qualifications: ['Statistics background', 'Tableau certified', 'Excel advanced'],
    workerId: 'user-1',
  },
  {
    id: 'role-4',
    name: 'Project Manager',
    category: 'Management',
    issuer: 'BrandWorks Inc',
    status: 'active',
    hourlyRate: 80,
    totalBookings: 18,
    lastBooked: new Date('2025-11-20'),
    requirements: ['PMP certified', 'Stakeholder management', '5+ years PM experience'],
    description: 'Manage cross-functional teams and deliver projects on time',
    qualifications: ['PMP', 'Scrum Master', 'Risk management'],
    workerId: 'user-1',
  },
  {
    id: 'role-5',
    name: 'Content Writer',
    category: 'Marketing',
    issuer: 'ContentFirst Media',
    status: 'inactive',
    hourlyRate: 55,
    totalBookings: 12,
    lastBooked: new Date('2025-10-15'),
    requirements: ['SEO knowledge', 'Blog writing', 'CMS experience'],
    description: 'Write engaging content for blogs, websites, and social media',
    qualifications: ['Journalism degree', 'WordPress', 'Google Analytics'],
    workerId: 'user-1',
  },
  {
    id: 'role-6',
    name: 'Business Analyst',
    category: 'Business',
    issuer: 'ServiceFirst',
    status: 'active',
    hourlyRate: 72,
    totalBookings: 22,
    lastBooked: new Date('2025-11-30'),
    requirements: ['Requirements gathering', 'Process mapping', 'Documentation'],
    description: 'Bridge business needs with technical solutions',
    qualifications: ['MBA', 'CBAP', 'Six Sigma'],
    workerId: 'user-1',
  },
  {
    id: 'role-7',
    name: 'Digital Marketing Specialist',
    category: 'Marketing',
    issuer: 'BrandWorks Inc',
    status: 'active',
    hourlyRate: 65,
    totalBookings: 35,
    lastBooked: new Date('2025-12-02'),
    requirements: ['Google Ads', 'Social media campaigns', 'Analytics'],
    description: 'Execute digital marketing strategies across multiple channels',
    qualifications: ['Marketing degree', 'Google Ads certified', 'HubSpot'],
    workerId: 'user-1',
  },
  {
    id: 'role-8',
    name: 'Quality Assurance Engineer',
    category: 'Technology',
    issuer: 'TechCorp Solutions',
    status: 'active',
    hourlyRate: 68,
    totalBookings: 29,
    lastBooked: new Date('2025-11-27'),
    requirements: ['Test automation', 'Selenium', 'Bug tracking'],
    description: 'Ensure software quality through comprehensive testing',
    qualifications: ['ISTQB certified', 'Automation testing', 'CI/CD'],
    workerId: 'user-1',
  },
  {
    id: 'role-9',
    name: 'Customer Success Manager',
    category: 'Customer Service',
    issuer: 'ServiceFirst',
    status: 'pending',
    hourlyRate: 58,
    totalBookings: 0,
    requirements: ['Client relationships', 'CRM software', 'Communication skills'],
    description: 'Build lasting relationships and ensure customer satisfaction',
    qualifications: ['Sales experience', 'Salesforce', 'Customer service'],
    workerId: 'user-1',
  },
  {
    id: 'role-10',
    name: 'DevOps Engineer',
    category: 'Technology',
    issuer: 'TechCorp Solutions',
    status: 'active',
    hourlyRate: 90,
    totalBookings: 15,
    lastBooked: new Date('2025-11-22'),
    requirements: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD pipelines'],
    description: 'Maintain infrastructure and automate deployment processes',
    qualifications: ['Cloud certified', 'Linux admin', 'Infrastructure as Code'],
    workerId: 'user-1',
  },
];

// Mock Worker Availability Pattern
export const mockAvailabilityPattern: WorkerAvailabilityPattern = {
  userId: 'user-1',
  weeklyPattern: {
    monday: [{ start: 9, end: 17 }],
    tuesday: [{ start: 9, end: 17 }],
    wednesday: [{ start: 9, end: 17 }],
    thursday: [{ start: 9, end: 17 }],
    friday: [{ start: 9, end: 17 }],
    saturday: [],
    sunday: [],
  },
  exceptions: [
    {
      date: new Date('2025-12-25'),
      available: false,
      reason: 'Holiday',
    },
    {
      date: new Date('2025-12-31'),
      available: false,
      reason: 'Personal',
    },
  ],
};

// Mock Market Data
export const mockMarketData = {
  supplyDemandByDay: [
    { day: 'M', supply: 45, demand: 38 },
    { day: 'T', supply: 52, demand: 41 },
    { day: 'W', supply: 48, demand: 45 },
    { day: 'Th', supply: 51, demand: 48 },
    { day: 'F', supply: 43, demand: 52 },
    { day: 'S', supply: 28, demand: 22 },
    { day: 'Su', supply: 22, demand: 18 },
  ],
  supplyDemandByHour: [
    { hour: '0', supply: 8, demand: 5 },
    { hour: '6', supply: 42, demand: 38 },
    { hour: '12', supply: 65, demand: 58 },
    { hour: '18', supply: 48, demand: 45 },
    { hour: '24', supply: 12, demand: 8 },
  ],
  noticePeriod: [
    { range: '<1', count: 8 },
    { range: '<2', count: 15 },
    { range: '<4', count: 32 },
    { range: '<8', count: 45 },
    { range: '<12', count: 38 },
    { range: '<24', count: 28 },
    { range: '<48', count: 18 },
    { range: '>48', count: 12 },
  ],
  rateByDay: [
    { day: 'M', rate: 18.5 },
    { day: 'T', rate: 17.8 },
    { day: 'W', rate: 18.2 },
    { day: 'Th', rate: 19.1 },
    { day: 'F', rate: 19.8 },
    { day: 'S', rate: 16.2 },
    { day: 'Su', rate: 15.5 },
  ],
};

// Mock Booking Data
export const mockBookingAccounts = [
  { id: 'acc-1', name: 'Main Operations Account', balance: 12450.50 },
  { id: 'acc-2', name: 'Marketing Campaign Fund', balance: 8200.00 },
  { id: 'acc-3', name: 'Special Projects', balance: 15600.75 },
];

export const mockBookingRoles = [
  { id: 'role-survey', name: 'Customer Surveyors' },
  { id: 'role-research', name: 'Market Researchers' },
  { id: 'role-data', name: 'Data Entry Specialists' },
  { id: 'role-retail', name: 'Retail Assistants' },
  { id: 'role-demo', name: 'Product Demonstrators' },
];

export const mockBookingLocations = [
  { id: 'loc-1', name: 'London - Central', address: 'City Centre, London EC1' },
  { id: 'loc-2', name: 'Manchester - Trafford', address: 'Trafford Park, Manchester M17' },
  { id: 'loc-3', name: 'Birmingham - Bullring', address: 'Bull Ring, Birmingham B5' },
  { id: 'loc-4', name: 'Leeds - City Centre', address: 'City Square, Leeds LS1' },
];

// Generate heatmap data for worker availability
export const generateWorkerHeatmap = () => {
  const dates: Date[] = [];
  const startDate = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }

  const heatmapData: any[][] = [];

  dates.forEach((date) => {
    const daySlots: any[] = [];
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    for (let hour = 6; hour < 18; hour++) {
      // More workers available during business hours on weekdays
      let baseCount = 0;

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Weekday
        if (hour >= 9 && hour < 17) {
          baseCount = Math.floor(Math.random() * 5) + 5; // 5-9 workers
        } else {
          baseCount = Math.floor(Math.random() * 3) + 2; // 2-4 workers
        }
      } else {
        // Weekend
        baseCount = Math.floor(Math.random() * 3) + 1; // 1-3 workers
      }

      daySlots.push({
        day: date,
        hour,
        available: true,
        count: baseCount,
        metadata: {
          workerCount: baseCount,
        },
      });
    }

    heatmapData.push(daySlots);
  });

  return heatmapData;
};

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
