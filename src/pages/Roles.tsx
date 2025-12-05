import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Clock, Plus } from 'lucide-react';
import DataTable, { Column } from '@/components/poems/DataTable';
import FilterBar, { Filter } from '@/components/poems/FilterBar';
import StatsCard from '@/components/poems/StatsCard';
import { Button } from '@/components/ui/button';
import { WorkerRole } from '@/types';
import { mockWorkerRoles } from '@/data/mockData';

export default function Roles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter data
  const filteredRoles = useMemo(() => {
    return mockWorkerRoles.filter((role) => {
      const matchesSearch = searchQuery === '' ||
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.issuer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === '' || role.category === categoryFilter;
      const matchesStatus = statusFilter === '' || role.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  // Get unique categories
  const categories = Array.from(new Set(mockWorkerRoles.map(r => r.category)));

  // Calculate stats
  const activeRoles = mockWorkerRoles.filter(r => r.status === 'active').length;
  const totalBookings = mockWorkerRoles.reduce((sum, r) => sum + r.totalBookings, 0);
  const avgHourlyRate = Math.round(
    mockWorkerRoles.reduce((sum, r) => sum + r.hourlyRate, 0) / mockWorkerRoles.length
  );

  // Filter configuration
  const filters: Filter[] = [
    {
      id: 'search',
      type: 'search',
      placeholder: 'Search roles or issuers...',
      value: searchQuery,
      onChange: setSearchQuery,
    },
    {
      id: 'category',
      type: 'select',
      label: 'Category',
      placeholder: 'All Categories',
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: categories.map(cat => ({ value: cat, label: cat })),
    },
    {
      id: 'status',
      type: 'select',
      label: 'Status',
      placeholder: 'All Statuses',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
    },
  ];

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  // Table columns
  const columns: Column<WorkerRole>[] = [
    {
      key: 'name',
      label: 'Role Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-semibold">{value}</div>
          <div className="text-xs text-muted-foreground">{row.category}</div>
        </div>
      ),
    },
    {
      key: 'issuer',
      label: 'Issuer',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const colors = {
          active: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          inactive: 'bg-gray-100 text-gray-800 border-gray-300',
          pending: 'bg-amber-100 text-amber-800 border-amber-300',
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${colors[value as keyof typeof colors]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'hourlyRate',
      label: 'Hourly Rate',
      sortable: true,
      align: 'right',
      render: (value) => `$${value}`,
    },
    {
      key: 'totalBookings',
      label: 'Bookings',
      sortable: true,
      align: 'center',
    },
    {
      key: 'lastBooked',
      label: 'Last Booked',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-muted-foreground">Never</span>;
        return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      },
    },
  ];

  // Expandable content for role details
  const renderExpandedContent = (role: WorkerRole) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
      <div>
        <h4 className="font-semibold text-sm mb-2">Description</h4>
        <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

        <h4 className="font-semibold text-sm mb-2">Requirements</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {role.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-2">Qualifications</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {role.qualifications.map((qual, idx) => (
            <li key={idx}>{qual}</li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{role.category}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Total Earnings:</span>
            <span className="font-medium">${role.hourlyRate * role.totalBookings * 8}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">My Roles</h1>
            <p className="text-muted-foreground mt-1">
              Manage your professional roles and qualifications
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Role
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Active Roles"
          value={activeRoles}
          subtitle={`${mockWorkerRoles.length} total roles`}
          icon={Briefcase}
          color="emerald"
        />
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          subtitle="Across all roles"
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Avg Hourly Rate"
          value={`$${avgHourlyRate}`}
          subtitle="Per hour"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onClearAll={handleClearFilters}
        className="mb-6"
      />

      {/* Roles Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <DataTable
          columns={columns}
          data={filteredRoles}
          expandable
          expandedContent={renderExpandedContent}
          sortable
          emptyState={
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">No roles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || categoryFilter || statusFilter
                  ? 'Try adjusting your filters'
                  : 'Add your first role to get started'}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>
          }
        />
      </motion.div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Showing {filteredRoles.length} of {mockWorkerRoles.length} roles
      </div>
    </div>
  );
}
