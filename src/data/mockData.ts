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

// Mock Worker Profiles for Selection
export const mockWorkerProfiles: import('@/types').WorkerProfile[] = [
  {
    id: 'wp-1',
    name: 'James Mitchell',
    photo: 'https://i.pravatar.cc/150?img=12',
    roleMatch: true,
    rating: 4.8,
    rank: 1,
    ourBookings: 45,
    ourHours: 360,
    agency: 'Elite Staffing',
    rate: 28,
    bio: 'Experienced customer survey specialist with 8+ years in market research. Excellent communication skills and attention to detail.',
    refCode: 'WK-2024-1547',
    activityInSystem: { clients: 12, bookings: 156, hoursSold: 1248 },
    tempWorkOutside: 'Part-time retail consultant',
    credentials: ['Enhanced DBS Check', 'Food Safety Level 2', 'First Aid Certified'],
    tags: ['Customer Service', 'Surveys', 'Data Collection', 'Retail'],
    documents: [
      { name: 'DBS Certificate.pdf', url: '#' },
      { name: 'Certifications.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-2',
    name: 'Sarah Williams',
    photo: 'https://i.pravatar.cc/150?img=45',
    roleMatch: true,
    rating: 4.9,
    rank: 1,
    ourBookings: 52,
    ourHours: 416,
    agency: 'ProStaff Solutions',
    rate: 32,
    bio: 'Market research professional specializing in consumer behavior analysis and data collection methodologies.',
    refCode: 'WK-2024-0892',
    activityInSystem: { clients: 15, bookings: 187, hoursSold: 1496 },
    tempWorkOutside: 'Freelance research consultant',
    credentials: ['MRS Certified', 'GDPR Trained', 'Enhanced DBS'],
    tags: ['Market Research', 'Analysis', 'Surveys', 'Consumer Insights'],
    documents: [
      { name: 'MRS Certificate.pdf', url: '#' },
      { name: 'References.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-3',
    name: 'David Thompson',
    photo: 'https://i.pravatar.cc/150?img=33',
    roleMatch: false,
    rating: 4.3,
    rank: 2,
    ourBookings: 28,
    ourHours: 224,
    agency: 'QuickHire',
    rate: 22,
    bio: 'Retail and customer service background with strong interpersonal skills. Transitioning into market research.',
    refCode: 'WK-2024-3241',
    activityInSystem: { clients: 8, bookings: 67, hoursSold: 536 },
    tempWorkOutside: 'Weekend retail assistant',
    credentials: ['Basic DBS', 'Customer Service Training'],
    tags: ['Retail', 'Customer Service', 'Communication'],
    documents: [{ name: 'DBS Certificate.pdf', url: '#' }],
  },
  {
    id: 'wp-4',
    name: 'Emma Davis',
    photo: 'https://i.pravatar.cc/150?img=47',
    roleMatch: true,
    rating: 4.7,
    rank: 2,
    ourBookings: 38,
    ourHours: 304,
    agency: 'Elite Staffing',
    rate: 26,
    bio: 'Detail-oriented survey professional with experience in both telephone and face-to-face data collection.',
    refCode: 'WK-2024-1876',
    activityInSystem: { clients: 10, bookings: 112, hoursSold: 896 },
    tempWorkOutside: 'None',
    credentials: ['Enhanced DBS', 'Telephone Interview Training', 'CATI Certified'],
    tags: ['Surveys', 'Telephone Interviews', 'Data Entry'],
    documents: [
      { name: 'Training Certificates.pdf', url: '#' },
      { name: 'DBS Certificate.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-5',
    name: 'Michael Brown',
    photo: 'https://i.pravatar.cc/150?img=51',
    roleMatch: true,
    rating: 4.6,
    rank: 3,
    ourBookings: 31,
    ourHours: 248,
    agency: 'FlexWork Agency',
    rate: 24,
    bio: 'Friendly and approachable surveyor with a knack for engaging respondents and achieving high response rates.',
    refCode: 'WK-2024-2198',
    activityInSystem: { clients: 9, bookings: 89, hoursSold: 712 },
    tempWorkOutside: 'Event staff',
    credentials: ['Basic DBS', 'Survey Skills Workshop'],
    tags: ['Face-to-face Surveys', 'Public Engagement', 'Events'],
    documents: [{ name: 'References.pdf', url: '#' }],
  },
  {
    id: 'wp-6',
    name: 'Lisa Anderson',
    photo: 'https://i.pravatar.cc/150?img=48',
    roleMatch: true,
    rating: 5.0,
    rank: 1,
    ourBookings: 67,
    ourHours: 536,
    agency: 'ProStaff Solutions',
    rate: 35,
    bio: 'Top-rated market researcher with expertise in qualitative and quantitative methodologies. PhD in Consumer Psychology.',
    refCode: 'WK-2023-0445',
    activityInSystem: { clients: 18, bookings: 223, hoursSold: 1784 },
    tempWorkOutside: 'University lecturer',
    credentials: ['MRS Advanced', 'PhD Consumer Psychology', 'Enhanced DBS', 'GDPR Expert'],
    tags: ['Advanced Research', 'Psychology', 'Qualitative', 'Quantitative'],
    documents: [
      { name: 'PhD Certificate.pdf', url: '#' },
      { name: 'MRS Advanced.pdf', url: '#' },
      { name: 'Publications.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-7',
    name: 'Robert Taylor',
    photo: 'https://i.pravatar.cc/150?img=15',
    roleMatch: false,
    rating: 3.9,
    rank: 4,
    ourBookings: 12,
    ourHours: 96,
    agency: 'QuickHire',
    rate: 18,
    bio: 'Entry-level survey worker looking to build experience in market research field.',
    refCode: 'WK-2024-4532',
    activityInSystem: { clients: 4, bookings: 23, hoursSold: 184 },
    tempWorkOutside: 'Delivery driver',
    credentials: ['Basic DBS'],
    tags: ['Entry Level', 'Eager to Learn'],
    documents: [{ name: 'DBS Certificate.pdf', url: '#' }],
  },
  {
    id: 'wp-8',
    name: 'Jennifer Martinez',
    photo: 'https://i.pravatar.cc/150?img=23',
    roleMatch: true,
    rating: 4.8,
    rank: 2,
    ourBookings: 41,
    ourHours: 328,
    agency: 'Elite Staffing',
    rate: 27,
    bio: 'Bilingual survey specialist (English/Spanish) with strong cultural awareness and excellent response rates.',
    refCode: 'WK-2024-1203',
    activityInSystem: { clients: 11, bookings: 134, hoursSold: 1072 },
    tempWorkOutside: 'Translation services',
    credentials: ['Enhanced DBS', 'Bilingual Certification', 'Cultural Awareness Training'],
    tags: ['Bilingual', 'Spanish', 'Cultural Competence', 'Surveys'],
    documents: [
      { name: 'Language Certificate.pdf', url: '#' },
      { name: 'DBS Certificate.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-9',
    name: 'Christopher Wilson',
    photo: 'https://i.pravatar.cc/150?img=68',
    roleMatch: true,
    rating: 4.5,
    rank: 3,
    ourBookings: 29,
    ourHours: 232,
    agency: 'FlexWork Agency',
    rate: 23,
    bio: 'Experienced in door-to-door surveys and street intercepts. High energy and persistent.',
    refCode: 'WK-2024-2847',
    activityInSystem: { clients: 7, bookings: 78, hoursSold: 624 },
    tempWorkOutside: 'Sales representative',
    credentials: ['Basic DBS', 'Health & Safety Awareness'],
    tags: ['Door-to-door', 'Street Surveys', 'Persistence'],
    documents: [{ name: 'Training Certificate.pdf', url: '#' }],
  },
  {
    id: 'wp-10',
    name: 'Amanda Lee',
    photo: 'https://i.pravatar.cc/150?img=10',
    roleMatch: true,
    rating: 4.7,
    rank: 2,
    ourBookings: 36,
    ourHours: 288,
    agency: 'ProStaff Solutions',
    rate: 26,
    bio: 'Specialist in healthcare and medical surveys. Understanding of medical terminology and patient sensitivity.',
    refCode: 'WK-2024-1654',
    activityInSystem: { clients: 9, bookings: 98, hoursSold: 784 },
    tempWorkOutside: 'Healthcare administrator',
    credentials: ['Enhanced DBS', 'Healthcare Research Training', 'Patient Privacy Certified'],
    tags: ['Healthcare', 'Medical Surveys', 'Sensitive Data', 'HIPAA'],
    documents: [
      { name: 'Healthcare Cert.pdf', url: '#' },
      { name: 'Privacy Training.pdf', url: '#' },
    ],
  },
  {
    id: 'wp-11',
    name: 'Daniel Garcia',
    photo: 'https://i.pravatar.cc/150?img=56',
    roleMatch: false,
    rating: 4.1,
    rank: 'New',
    ourBookings: 5,
    ourHours: 40,
    agency: 'QuickHire',
    rate: 19,
    bio: 'New to market research but eager and trainable. Strong work ethic and tech-savvy.',
    refCode: 'WK-2024-5789',
    activityInSystem: { clients: 2, bookings: 8, hoursSold: 64 },
    tempWorkOutside: 'Student',
    credentials: ['Basic DBS'],
    tags: ['New', 'Tech-savvy', 'Student'],
    documents: [{ name: 'DBS Certificate.pdf', url: '#' }],
  },
  {
    id: 'wp-12',
    name: 'Patricia Robinson',
    photo: 'https://i.pravatar.cc/150?img=20',
    roleMatch: true,
    rating: 4.9,
    rank: 1,
    ourBookings: 58,
    ourHours: 464,
    agency: 'Elite Staffing',
    rate: 30,
    bio: 'Senior surveyor with 12 years experience. Expert in complex questionnaires and difficult demographics.',
    refCode: 'WK-2023-0778',
    activityInSystem: { clients: 16, bookings: 201, hoursSold: 1608 },
    tempWorkOutside: 'None - dedicated to survey work',
    credentials: ['MRS Certified', 'Advanced Interview Techniques', 'Enhanced DBS', 'Team Leader Training'],
    tags: ['Senior', 'Expert', 'Complex Surveys', 'Team Leadership'],
    documents: [
      { name: 'MRS Certificate.pdf', url: '#' },
      { name: 'Leadership Training.pdf', url: '#' },
      { name: 'References.pdf', url: '#' },
    ],
  },
];

// Mock Opportunity Feed
export const mockOpportunityFeed: import('@/types').OpportunityFeedItem[] = [
  {
    id: 'opp-inv-1',
    category: 'investment',
    title: 'Advanced Survey Techniques Workshop',
    description: 'Intensive 2-day training on modern surveying methodologies and tools',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
    primaryMetric: { label: 'Investment', value: '$280' },
    secondaryMetric: { label: 'Skill Boost', value: '+25% rates' },
  },
  {
    id: 'opp-inv-2',
    category: 'investment',
    title: 'Market Research Certification',
    description: 'MRS-accredited certification program. Become a certified market researcher.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    primaryMetric: { label: 'Cost', value: '$450' },
    secondaryMetric: { label: 'Duration', value: '6 weeks' },
  },
  {
    id: 'opp-buy-1',
    category: 'buyers',
    title: 'Weekend Retail Survey - High Street',
    description: 'Consumer behavior survey at major shopping center. Saturday & Sunday.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    primaryMetric: { label: 'Rate', value: '$28/hr' },
    secondaryMetric: { label: 'Duration', value: '16 hours' },
  },
  {
    id: 'opp-buy-2',
    category: 'buyers',
    title: 'Healthcare Patient Satisfaction Survey',
    description: 'Telephone survey for NHS trust. Remote work available.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    primaryMetric: { label: 'Rate', value: '$26/hr' },
    secondaryMetric: { label: 'Utilization', value: '68%' },
  },
  {
    id: 'opp-buy-3',
    category: 'buyers',
    title: 'Political Opinion Poll',
    description: 'Door-to-door survey for upcoming election. Training provided.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400',
    primaryMetric: { label: 'Rate', value: '$24/hr' },
    secondaryMetric: { label: 'Start Date', value: 'Mar 15' },
  },
  {
    id: 'opp-buy-4',
    category: 'buyers',
    title: 'Product Launch Focus Groups',
    description: 'Facilitate focus groups for new tech product launch. Central London.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    primaryMetric: { label: 'Rate', value: '$32/hr' },
    secondaryMetric: { label: 'Sessions', value: '8' },
  },
  {
    id: 'opp-ben-1',
    category: 'benefits',
    title: 'Income Protection Insurance',
    description: 'Cover your earnings if you\'re unable to work due to illness or injury.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    primaryMetric: { label: 'From', value: '$12/mo' },
    secondaryMetric: { label: 'Coverage', value: '80%' },
  },
  {
    id: 'opp-ben-2',
    category: 'benefits',
    title: 'Retirement Savings Plan',
    description: 'Build your pension with matched contributions and tax benefits.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
    primaryMetric: { label: 'Match', value: '5%' },
    secondaryMetric: { label: 'Tax Relief', value: '20%' },
  },
  {
    id: 'opp-ben-3',
    category: 'benefits',
    title: 'Professional Indemnity Insurance',
    description: 'Protection against claims of professional negligence or errors.',
    image: 'https://images.unsplash.com/photo-1554224311-beee449f5952?w=400',
    primaryMetric: { label: 'From', value: '$8/mo' },
    secondaryMetric: { label: 'Cover', value: '$500k' },
  },
  {
    id: 'opp-soc-1',
    category: 'social',
    title: 'Market Research Professionals Meetup',
    description: 'Monthly networking event for survey professionals. Share best practices.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    primaryMetric: { label: 'Next Event', value: 'Mar 20' },
    secondaryMetric: { label: 'Attendees', value: '45+' },
  },
  {
    id: 'opp-soc-2',
    category: 'social',
    title: 'Survey Skills Workshop',
    description: 'Free workshop on handling difficult respondents and maximizing response rates.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400',
    primaryMetric: { label: 'Cost', value: 'Free' },
    secondaryMetric: { label: 'Spots', value: '12 left' },
  },
  {
    id: 'opp-soc-3',
    category: 'social',
    title: 'Industry Conference - Research Live',
    description: 'Annual market research conference. Keynotes, workshops, and networking.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    primaryMetric: { label: 'Early Bird', value: '$180' },
    secondaryMetric: { label: 'Date', value: 'Jun 12-14' },
  },
  {
    id: 'opp-inv-3',
    category: 'investment',
    title: 'Data Analysis with Python',
    description: 'Learn to analyze survey data using Python and pandas. Online course.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    primaryMetric: { label: 'Cost', value: '$199' },
    secondaryMetric: { label: 'Duration', value: '8 weeks' },
  },
  {
    id: 'opp-buy-5',
    category: 'buyers',
    title: 'Mystery Shopping Assignment',
    description: 'Evaluate customer service at major retail chains. Reimbursement included.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
    primaryMetric: { label: 'Rate', value: '$22/hr' },
    secondaryMetric: { label: 'Locations', value: '15' },
  },
  {
    id: 'opp-ben-4',
    category: 'benefits',
    title: 'Health & Dental Plan',
    description: 'Comprehensive health coverage including dental and vision care.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    primaryMetric: { label: 'From', value: '$45/mo' },
    secondaryMetric: { label: 'Family', value: '$120/mo' },
  },
  {
    id: 'opp-soc-4',
    category: 'social',
    title: 'POEMs Community Forum',
    description: 'Join our online community to share experiences and get advice from peers.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    primaryMetric: { label: 'Members', value: '2,340' },
    secondaryMetric: { label: 'Active', value: '580/day' },
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

// ==== CHAIN BUILDER & PACKAGE DATA ====

export const requirementTypes = [
  { value: 'room', label: 'Room/Venue', icon: 'Building' },
  { value: 'equipment', label: 'Equipment', icon: 'Laptop' },
  { value: 'catering', label: 'Catering', icon: 'UtensilsCrossed' },
  { value: 'staff', label: 'Staff', icon: 'Users' },
  { value: 'transportation', label: 'Transportation', icon: 'Car' },
];

export const locationOptions = [
  { value: 'london-city', label: 'London City Centre', coordinates: { lat: 51.5074, lng: -0.1278 } },
  { value: 'manchester', label: 'Manchester', coordinates: { lat: 53.4808, lng: -2.2426 } },
  { value: 'birmingham', label: 'Birmingham', coordinates: { lat: 52.4862, lng: -1.8904 } },
  { value: 'edinburgh', label: 'Edinburgh', coordinates: { lat: 55.9533, lng: -3.1883 } },
];

export const roomOptions = [
  { value: 'conf-50', label: 'Conference Room (50 pax)', price: 150 },
  { value: 'conf-100', label: 'Conference Room (100 pax)', price: 250 },
  { value: 'hall-200', label: 'Event Hall (200 pax)', price: 450 },
];

export const equipmentOptions = [
  { value: 'projector', label: 'Projector & Screen', price: 50 },
  { value: 'av-basic', label: 'AV Package (Basic)', price: 120 },
  { value: 'av-premium', label: 'AV Package (Premium)', price: 280 },
];

export const cateringOptions = [
  { value: 'breakfast', label: 'Breakfast Buffet', pricePerPerson: 12 },
  { value: 'lunch', label: 'Lunch Buffet', pricePerPerson: 18 },
  { value: 'dinner', label: 'Dinner Service', pricePerPerson: 35 },
  { value: 'snacks', label: 'Snacks & Refreshments', pricePerPerson: 8 },
];

export const staffRoleOptions = [
  { value: 'receptionist', label: 'Receptionist', rate: 22 },
  { value: 'assistant', label: 'Event Assistant', rate: 18 },
  { value: 'tech-support', label: 'Tech Support', rate: 35 },
  { value: 'coordinator', label: 'Event Coordinator', rate: 45 },
];

export const transportOptions = [
  { value: 'taxi', label: 'Taxi (4 pax)', pricePerTrip: 25 },
  { value: 'minibus', label: 'Minibus (12 pax)', pricePerTrip: 65 },
  { value: 'coach', label: 'Coach (50 pax)', pricePerTrip: 180 },
];

export interface PackageOption {
  id: string;
  complete: boolean;
  components: {
    transportation?: { provider: string; price: number; type: string };
    room?: { provider: string; price: number; bundled?: boolean };
    equipment?: { provider: string; price: number; bundledWithRoom?: boolean };
    display?: { provider: string; price: number };
    catering?: { provider: string; price: number; bundled?: boolean };
    staff?: { provider: string; price: number };
    returnTransport?: { provider: string; price: number; type: string };
  };
  totalPrice: number;
  rating: number;
  location: string;
}

export const mockPackages: PackageOption[] = [
  {
    id: 'pkg-1',
    complete: true,
    components: {
      transportation: { provider: 'City Cabs', price: 25, type: 'Taxi' },
      room: { provider: 'Grand Conference Centre', price: 250, bundled: false },
      equipment: { provider: 'WITH ROOM', price: 0, bundledWithRoom: true },
      display: { provider: 'AV Solutions Ltd', price: 120 },
      catering: { provider: 'Premium Catering Co', price: 360, bundled: false },
      staff: { provider: 'Event Staff Pro', price: 176 },
      returnTransport: { provider: 'City Cabs', price: 25, type: 'Taxi' },
    },
    totalPrice: 956,
    rating: 4.8,
    location: 'London City Centre',
  },
  {
    id: 'pkg-2',
    complete: true,
    components: {
      transportation: { provider: 'QuickRide', price: 22, type: 'Taxi' },
      room: { provider: 'Business Hub', price: 180, bundled: false },
      equipment: { provider: 'Business Hub', price: 50, bundledWithRoom: false },
      display: { provider: 'WITH EQUIPMENT', price: 0 },
      catering: { provider: 'WITH ROOM', price: 0, bundled: true },
      staff: { provider: 'FlexStaff', price: 144 },
      returnTransport: { provider: 'QuickRide', price: 22, type: 'Taxi' },
    },
    totalPrice: 418,
    rating: 4.5,
    location: 'London City Centre',
  },
  {
    id: 'pkg-3',
    complete: true,
    components: {
      transportation: { provider: 'Metro Coaches', price: 65, type: 'Minibus' },
      room: { provider: 'Victoria Conference Hall', price: 320, bundled: false },
      equipment: { provider: 'WITH ROOM', price: 0, bundledWithRoom: true },
      display: { provider: 'Tech Display Pro', price: 95 },
      catering: { provider: 'Victoria Catering', price: 288, bundled: false },
      staff: { provider: 'Elite Events', price: 198 },
      returnTransport: { provider: 'Metro Coaches', price: 65, type: 'Minibus' },
    },
    totalPrice: 1031,
    rating: 4.9,
    location: 'London City Centre',
  },
  {
    id: 'pkg-4',
    complete: true,
    components: {
      transportation: { provider: 'City Cabs', price: 25, type: 'Taxi' },
      room: { provider: 'Central Venue', price: 200, bundled: false },
      equipment: { provider: 'AV Rentals', price: 85, bundledWithRoom: false },
      display: { provider: 'WITH EQUIPMENT', price: 0 },
      catering: { provider: 'Quick Bites', price: 240, bundled: false },
      staff: { provider: 'Event Staff Pro', price: 160 },
      returnTransport: { provider: 'City Cabs', price: 25, type: 'Taxi' },
    },
    totalPrice: 735,
    rating: 4.3,
    location: 'London City Centre',
  },
  {
    id: 'pkg-5',
    complete: true,
    components: {
      transportation: { provider: 'Executive Cars', price: 45, type: 'Executive' },
      room: { provider: 'Luxury Conference', price: 450, bundled: false },
      equipment: { provider: 'WITH ROOM', price: 0, bundledWithRoom: true },
      display: { provider: 'Premium AV', price: 180 },
      catering: { provider: 'Gourmet Catering', price: 525, bundled: false },
      staff: { provider: 'Professional Events', price: 225 },
      returnTransport: { provider: 'Executive Cars', price: 45, type: 'Executive' },
    },
    totalPrice: 1470,
    rating: 5.0,
    location: 'London City Centre',
  },
  {
    id: 'pkg-6',
    complete: false,
    components: {
      transportation: { provider: 'City Cabs', price: 25, type: 'Taxi' },
      room: { provider: 'Meeting Space Hub', price: 150, bundled: false },
      equipment: { provider: 'WITH ROOM', price: 0, bundledWithRoom: true },
      catering: { provider: 'Simple Catering', price: 180, bundled: false },
      returnTransport: { provider: 'City Cabs', price: 25, type: 'Taxi' },
    },
    totalPrice: 380,
    rating: 4.0,
    location: 'London City Centre',
  },
  {
    id: 'pkg-7',
    complete: false,
    components: {
      room: { provider: 'Community Centre', price: 100, bundled: false },
      equipment: { provider: 'Basic AV', price: 40, bundledWithRoom: false },
      staff: { provider: 'Student Helpers', price: 88 },
    },
    totalPrice: 228,
    rating: 3.8,
    location: 'London City Centre',
  },
  {
    id: 'pkg-8',
    complete: false,
    components: {
      transportation: { provider: 'QuickRide', price: 22, type: 'Taxi' },
      room: { provider: 'Budget Venue', price: 120, bundled: false },
      display: { provider: 'Display Hire', price: 60 },
      returnTransport: { provider: 'QuickRide', price: 22, type: 'Taxi' },
    },
    totalPrice: 224,
    rating: 3.5,
    location: 'London City Centre',
  },
];

// ==== INTERVENTION DATA ====

export const interventionRoles = [
  'Customer Survey Specialist',
  'Market Research Interviewer',
  'Data Collection Assistant',
  'Mystery Shopper',
  'Field Researcher',
  'Event Assistant',
  'Receptionist',
  'Administrative Support',
  'Warehouse Operative',
  'Retail Assistant',
  'Delivery Driver',
  'Cleaner',
  'Security Guard',
  'Kitchen Assistant',
  'Hospitality Staff',
  'Call Centre Operator',
  'Data Entry Clerk',
  'General Labourer',
  'Promotional Staff',
  'Stock Counter',
];

export const interventionSkills = [
  'Customer Service',
  'Data Collection',
  'Communication',
  'Attention to Detail',
  'Computer Literacy',
  'Driving License',
  'Food Safety',
  'First Aid',
  'Cash Handling',
  'Inventory Management',
  'Report Writing',
  'Time Management',
  'Teamwork',
  'Problem Solving',
  'Microsoft Office',
  'Phone Etiquette',
  'Physical Fitness',
  'Multilingual',
  'Conflict Resolution',
  'Sales Experience',
];

export const geographicAreas = [
  { value: 'london', label: 'London', beneficiaries: 2450 },
  { value: 'manchester', label: 'Manchester', beneficiaries: 980 },
  { value: 'birmingham', label: 'Birmingham', beneficiaries: 1120 },
  { value: 'edinburgh', label: 'Edinburgh', beneficiaries: 650 },
  { value: 'glasgow', label: 'Glasgow', beneficiaries: 720 },
  { value: 'liverpool', label: 'Liverpool', beneficiaries: 540 },
  { value: 'bristol', label: 'Bristol', beneficiaries: 480 },
  { value: 'nationwide', label: 'Nationwide', beneficiaries: 8500 },
];
