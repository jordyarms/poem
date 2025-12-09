import { useState } from 'react';
import { Users, Plus, Minus, DollarSign, Clock, User, Star, CheckCircle, XCircle } from 'lucide-react';
import DataTable from '@/components/poems/DataTable';
import WorkerDetailPanel from '@/components/poems/WorkerDetailPanel';
import FilterBar from '@/components/poems/FilterBar';
import { Button } from '@/components/ui/button';
import { mockWorkerProfiles } from '@/data/mockData';
import { WorkerProfile } from '@/types';

export default function SelectWorkers() {
  const [availableWorkers, setAvailableWorkers] = useState<WorkerProfile[]>(mockWorkerProfiles);
  const [selectedWorkers, setSelectedWorkers] = useState<WorkerProfile[]>([]);
  const [selectedWorkerForPanel, setSelectedWorkerForPanel] = useState<WorkerProfile | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Move worker to selected list
  const selectWorker = (workerId: string) => {
    const worker = availableWorkers.find((w) => w.id === workerId);
    if (worker) {
      setAvailableWorkers(availableWorkers.filter((w) => w.id !== workerId));
      setSelectedWorkers([...selectedWorkers, worker]);
    }
  };

  // Move worker back to available list
  const deselectWorker = (workerId: string) => {
    const worker = selectedWorkers.find((w) => w.id === workerId);
    if (worker) {
      setSelectedWorkers(selectedWorkers.filter((w) => w.id !== workerId));
      setAvailableWorkers([...availableWorkers, worker]);
    }
  };

  // Open worker detail panel
  const viewWorkerDetails = (worker: WorkerProfile) => {
    setSelectedWorkerForPanel(worker);
    setIsPanelOpen(true);
  };

  // Calculate total cost
  const totalHours = 40; // Hardcoded for prototype
  const totalCost = selectedWorkers.reduce((sum, worker) => sum + worker.rate * totalHours, 0);
  const averageRate = selectedWorkers.length > 0 ? totalCost / totalHours / selectedWorkers.length : 0;

  // Filter available workers
  const filteredAvailableWorkers = availableWorkers.filter((worker) => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || worker.roleMatch.toString() === roleFilter;
    const matchesRating = !ratingFilter || worker.rating >= parseFloat(ratingFilter);
    return matchesSearch && matchesRole && matchesRating;
  });

  // DataTable columns for available workers
  const availableColumns = [
    {
      key: 'name',
      label: 'Worker',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center gap-3">
          {worker.photo && (
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
            />
          )}
          <div>
            <div className="font-semibold">{worker.name}</div>
            <div className="text-xs text-muted-foreground">{worker.agency}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'roleMatch',
      label: 'Role Match',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center justify-center">
          {worker.roleMatch ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <XCircle className="w-5 h-5 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(worker.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-medium">{worker.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'rank',
      label: 'Rank',
      sortable: true,
    },
    {
      key: 'ourBookings',
      label: 'Our Bookings',
      sortable: true,
    },
    {
      key: 'ourHours',
      label: 'Our Hours',
      sortable: true,
    },
    {
      key: 'rate',
      label: 'Rate',
      sortable: true,
      render: (worker: WorkerProfile) => <span className="font-semibold">${worker.rate}/hr</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (worker: WorkerProfile) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              viewWorkerDetails(worker);
            }}
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              selectWorker(worker.id);
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  // DataTable columns for selected workers
  const selectedColumns = [
    {
      key: 'name',
      label: 'Worker',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center gap-3">
          {worker.photo && (
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-200"
            />
          )}
          <div>
            <div className="font-semibold">{worker.name}</div>
            <div className="text-xs text-muted-foreground">{worker.agency}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'roleMatch',
      label: 'Role Match',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center justify-center">
          {worker.roleMatch ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <XCircle className="w-5 h-5 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (worker: WorkerProfile) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(worker.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-medium">{worker.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'rank',
      label: 'Rank',
      sortable: true,
    },
    {
      key: 'rate',
      label: 'Rate',
      sortable: true,
      render: (worker: WorkerProfile) => <span className="font-semibold">${worker.rate}/hr</span>,
    },
    {
      key: 'cost',
      label: `Cost (${totalHours}h)`,
      sortable: true,
      render: (worker: WorkerProfile) => (
        <span className="font-semibold text-blue-600">
          ${(worker.rate * totalHours).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (worker: WorkerProfile) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              viewWorkerDetails(worker);
            }}
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              deselectWorker(worker.id);
            }}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      id: 'search',
      type: 'search' as const,
      label: 'Search workers',
      value: searchTerm,
      onChange: setSearchTerm,
    },
    {
      id: 'role-match',
      type: 'select' as const,
      label: 'Role Match',
      value: roleFilter,
      onChange: setRoleFilter,
      options: [
        { label: 'All', value: '' },
        { label: 'Role Match', value: 'true' },
        { label: 'No Match', value: 'false' },
      ],
    },
    {
      id: 'min-rating',
      type: 'select' as const,
      label: 'Min Rating',
      value: ratingFilter,
      onChange: setRatingFilter,
      options: [
        { label: 'All', value: '' },
        { label: '4.5+', value: '4.5' },
        { label: '4.0+', value: '4.0' },
        { label: '3.5+', value: '3.5' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Select Your Workers
            </h1>
            <p className="text-muted-foreground mt-1">
              Choose workers for your booking - view details and build your team
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedWorkers.length === 0}
            >
              Confirm Selection ({selectedWorkers.length})
            </Button>
          </div>
        </div>

        {/* Available Workers */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Available Workers ({filteredAvailableWorkers.length})
            </h2>
          </div>

          <FilterBar filters={filters} />

          <div className="mt-4">
            <DataTable
              data={filteredAvailableWorkers}
              columns={availableColumns}
              onRowClick={(worker: WorkerProfile) => viewWorkerDetails(worker)}
            />
          </div>
        </div>

        {/* Selected Workers */}
        <div className="bg-card border border-blue-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Selected Workers ({selectedWorkers.length})
            </h2>
          </div>

          {selectedWorkers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No workers selected yet. Click the + button to add workers.</p>
            </div>
          ) : (
            <>
              <DataTable
                data={selectedWorkers}
                columns={selectedColumns}
                onRowClick={(worker: WorkerProfile) => viewWorkerDetails(worker)}
              />

              {/* Cost Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Workers</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{selectedWorkers.length}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Total Hours</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {totalHours * selectedWorkers.length}h
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Avg Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${averageRate.toFixed(2)}/hr
                    </div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300">
                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Total Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${totalCost.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Worker Detail Panel */}
      <WorkerDetailPanel
        worker={selectedWorkerForPanel}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
