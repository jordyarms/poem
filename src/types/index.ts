// POEMs Type Definitions

export type ReliabilityGrade = 1 | 2 | 3 | 4 | 5 | 6;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'business' | 'admin';
  reliabilityGrade: ReliabilityGrade;
  utilization: number; // percentage
  totalBookings: number;
  completedBookings: number;
  rating: number;
  avatar?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  businessId: string;
  businessName: string;
  location: string;
  startTime: Date;
  endTime: Date;
  hourlyRate: number;
  requiredGrade: ReliabilityGrade;
  status: 'open' | 'pending' | 'filled' | 'completed' | 'cancelled';
  category: string;
}

export interface Booking {
  id: string;
  opportunityId: string;
  workerId: string;
  businessId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  startTime: Date;
  endTime: Date;
  totalAmount: number;
}

export interface BusinessPool {
  id: string;
  name: string;
  description: string;
  businessId: string;
  workers: string[]; // worker IDs
  createdAt: Date;
}

export interface ChainTransaction {
  id: string;
  name: string;
  steps: ChainStep[];
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
}

export interface ChainStep {
  id: string;
  order: number;
  opportunityId: string;
  dependsOn?: string; // previous step ID
}

export interface MarketIntervention {
  id: string;
  type: 'price-adjustment' | 'capacity-boost' | 'demand-stimulus';
  targetCategory?: string;
  targetLocation?: string;
  adjustment: number; // percentage or absolute value
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'active' | 'expired';
  createdBy: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'opportunity' | 'system' | 'payment';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

export interface WorkerRole {
  id: string;
  name: string;
  category: string;
  issuer: string;
  status: 'active' | 'inactive' | 'pending';
  hourlyRate: number;
  totalBookings: number;
  lastBooked?: Date;
  requirements: string[];
  description: string;
  qualifications: string[];
  workerId: string;
}

export interface WorkerAvailabilityPattern {
  userId: string;
  weeklyPattern: {
    monday: { start: number; end: number }[];
    tuesday: { start: number; end: number }[];
    wednesday: { start: number; end: number }[];
    thursday: { start: number; end: number }[];
    friday: { start: number; end: number }[];
    saturday: { start: number; end: number }[];
    sunday: { start: number; end: number }[];
  };
  exceptions: {
    date: Date;
    available: boolean;
    reason?: string;
  }[];
}

export interface WorkerProfile {
  id: string;
  name: string;
  photo?: string;
  roleMatch: boolean;
  rating: number; // 1-5
  rank: ReliabilityGrade | 'New';
  ourBookings: number;
  ourHours: number;
  agency: string;
  rate: number; // hourly rate
  bio: string;
  refCode: string;
  activityInSystem: {
    clients: number;
    bookings: number;
    hoursSold: number;
  };
  tempWorkOutside: string;
  credentials: string[];
  tags: string[];
  documents: { name: string; url: string }[];
}

export interface OpportunityFeedItem {
  id: string;
  category: 'investment' | 'buyers' | 'benefits' | 'social';
  title: string;
  description: string;
  image?: string;
  primaryMetric: {
    label: string;
    value: string;
  };
  secondaryMetric: {
    label: string;
    value: string;
  };
  link?: string;
}
