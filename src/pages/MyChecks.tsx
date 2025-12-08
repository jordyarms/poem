import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

interface Credential {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  verified: boolean;
}

const mockCredentials: Credential[] = [
  {
    id: '1',
    name: 'Advanced Retail Skills',
    issuer: 'Walmart Academy',
    logo: '🏪',
    verified: true,
  },
  {
    id: '2',
    name: 'Certified Pet Dog Trainer (CPDT)',
    issuer: 'Certification Council for Professional Dog Tr...',
    logo: '📜',
    verified: true,
  },
  {
    id: '3',
    name: 'CRP certified',
    issuer: 'American Red Cross',
    logo: '🏥',
    verified: true,
  },
  {
    id: '4',
    name: 'Driving license (Car)',
    issuer: 'Issued by states, territories or DC',
    logo: '🚗',
    verified: true,
  },
  {
    id: '5',
    name: 'HCC Home Care Certification',
    issuer: 'NCCAP National Certification Council for Act...',
    logo: '🏡',
    verified: true,
  },
  {
    id: '6',
    name: 'Home Health Aide',
    issuer: 'California Department of Public Health',
    logo: '🏥',
    verified: true,
  },
  {
    id: '7',
    name: 'Live Scan Certificate',
    issuer: 'California Department of Justice',
    logo: '🔍',
    verified: true,
  },
  {
    id: '8',
    name: 'Food Handler Certificate',
    issuer: 'National Restaurant Association',
    logo: '🍽️',
    verified: true,
  },
  {
    id: '9',
    name: 'First Aid Certified',
    issuer: 'American Red Cross',
    logo: '⚕️',
    verified: true,
  },
  {
    id: '10',
    name: 'Forklift Operator',
    issuer: 'OSHA Certified Training',
    logo: '🏗️',
    verified: true,
  },
  {
    id: '11',
    name: 'Customer Service Excellence',
    issuer: 'Service Quality Institute',
    logo: '⭐',
    verified: true,
  },
  {
    id: '12',
    name: 'Background Check',
    issuer: 'National Criminal Database',
    logo: '✅',
    verified: true,
  },
  {
    id: '13',
    name: 'Commercial Driver\'s License (CDL)',
    issuer: 'Department of Motor Vehicles',
    logo: '🚛',
    verified: true,
  },
  {
    id: '14',
    name: 'ServSafe Manager',
    issuer: 'National Restaurant Association',
    logo: '🍔',
    verified: true,
  },
  {
    id: '15',
    name: 'Pharmacy Technician',
    issuer: 'Pharmacy Technician Certification Board',
    logo: '💊',
    verified: true,
  },
  {
    id: '16',
    name: 'Certified Nursing Assistant (CNA)',
    issuer: 'State Board of Nursing',
    logo: '👨‍⚕️',
    verified: true,
  },
  {
    id: '17',
    name: 'Property & Casualty License',
    issuer: 'State Department of Insurance',
    logo: '🏠',
    verified: true,
  },
  {
    id: '18',
    name: 'Notary Public',
    issuer: 'Secretary of State',
    logo: '📝',
    verified: true,
  },
];

function CredentialCard({ credential, index }: { credential: Credential; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {credential.logo}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {credential.name}
            </h3>
            {credential.verified && (
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">
            {credential.issuer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyChecks() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-600 text-white rounded-t-lg p-6 mb-0"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7" />
            <h1 className="text-2xl font-bold">My checks</h1>
          </div>
        </motion.div>

        {/* Credentials Section */}
        <div className="bg-white border-x border-b border-gray-200 rounded-b-lg">
          <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
            <h2 className="font-semibold text-gray-700">
              Credentials ({mockCredentials.length})
            </h2>
          </div>

          <div className="p-4 space-y-3">
            {mockCredentials.map((credential, index) => (
              <CredentialCard key={credential.id} credential={credential} index={index} />
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>All credentials are verified and up to date</p>
          <p className="text-xs text-gray-500 mt-1">
            You can add or update credentials in your profile settings
          </p>
        </motion.div>
      </div>
    </div>
  );
}
