import { useState } from 'react';
import { Package as PackageIcon, Map, Filter, ChevronLeft } from 'lucide-react';
import PackageTable from '@/components/poems/PackageTable';
import { Button } from '@/components/ui/button';
import { mockPackages } from '@/data/mockData';

type SortOption = 'lowestCost' | 'soonest' | 'bestRated';

export default function Packages() {
  const [sortBy, setSortBy] = useState<SortOption>('lowestCost');
  const [showIncomplete, setShowIncomplete] = useState(true);

  // Sort packages
  const sortedPackages = [...mockPackages].sort((a, b) => {
    switch (sortBy) {
      case 'lowestCost':
        return a.totalPrice - b.totalPrice;
      case 'bestRated':
        return b.rating - a.rating;
      case 'soonest':
        // For prototype, just use existing order
        return 0;
      default:
        return 0;
    }
  });

  // Filter packages
  const filteredPackages = showIncomplete
    ? sortedPackages
    : sortedPackages.filter((pkg) => pkg.complete);

  const completePackages = mockPackages.filter((pkg) => pkg.complete);
  const incompletePackages = mockPackages.filter((pkg) => !pkg.complete);

  const handleBuy = (packageId: string) => {
    console.log('Buying package:', packageId);
    // In a real app, this would navigate to checkout or booking confirmation
  };

  const handleEdit = (packageId: string, component: string) => {
    console.log('Editing component:', component, 'in package:', packageId);
    // In a real app, this would open a modal or navigate to edit view
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Requirements
              </Button>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <PackageIcon className="w-8 h-8 text-blue-600" />
              Select a Package
            </h1>
            <p className="text-muted-foreground mt-1">
              Choose from {completePackages.length} complete packages matching your requirements
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="hidden lg:block bg-muted/30 border border-border rounded-lg p-6 w-64 h-32">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Map className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="lowestCost">Lowest Cost</option>
                <option value="soonest">Soonest Date</option>
                <option value="bestRated">Best Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <input
                type="checkbox"
                id="show-incomplete"
                checked={showIncomplete}
                onChange={(e) => setShowIncomplete(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="show-incomplete" className="text-sm font-medium cursor-pointer">
                Show incomplete packages
              </label>
            </div>
          </div>

          <a href="#" className="text-sm text-blue-600 hover:underline">
            Refine requirements
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="text-sm font-medium text-emerald-700 mb-1">Complete Packages</div>
            <div className="text-3xl font-bold text-emerald-900">{completePackages.length}</div>
            <div className="text-xs text-emerald-700 mt-1">Ready to book now</div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="text-sm font-medium text-amber-700 mb-1">Incomplete Packages</div>
            <div className="text-3xl font-bold text-amber-900">{incompletePackages.length}</div>
            <div className="text-xs text-amber-700 mt-1">Missing some components</div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-700 mb-1">Best Value</div>
            <div className="text-3xl font-bold text-blue-900">
              £{Math.min(...completePackages.map((p) => p.totalPrice))}
            </div>
            <div className="text-xs text-blue-700 mt-1">Lowest complete package</div>
          </div>
        </div>

        {/* Package Table */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm overflow-hidden">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Available Packages</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredPackages.length} of {mockPackages.length} packages
            </p>
          </div>

          <PackageTable packages={filteredPackages} onBuy={handleBuy} onEdit={handleEdit} />

          {filteredPackages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <PackageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No packages match your current filters.</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowIncomplete(true)}>
                Show all packages
              </Button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-3">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                BUNDLED
              </div>
              <span className="text-muted-foreground">Included with another component</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                Incomplete
              </div>
              <span className="text-muted-foreground">Package missing required components</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600 hover:underline cursor-pointer">edit</span>
              <span className="text-muted-foreground">Modify component selection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
