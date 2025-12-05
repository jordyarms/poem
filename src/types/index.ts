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
