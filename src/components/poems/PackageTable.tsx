import { Star, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PackageOption } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PackageTableProps {
  packages: PackageOption[];
  onBuy: (packageId: string) => void;
  onEdit?: (packageId: string, component: string) => void;
}

export default function PackageTable({ packages, onBuy, onEdit }: PackageTableProps) {
  const renderComponent = (
    component: { provider: string; price: number; bundled?: boolean; bundledWithRoom?: boolean } | undefined,
    packageId: string,
    componentKey: string
  ) => {
    if (!component) {
      return (
        <div className="text-center py-3">
          <XIcon className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="text-xs text-red-600 font-medium">Missing</div>
        </div>
      );
    }

    const isBundled = component.bundled || component.bundledWithRoom;
    const displayPrice = isBundled ? 'BUNDLED' : `£${component.price}`;

    return (
      <div className="text-center py-3">
        <div className="font-medium text-sm mb-1">{component.provider}</div>
        <div className={cn('text-xs font-semibold', isBundled ? 'text-emerald-600' : 'text-blue-600')}>
          {displayPrice}
        </div>
        {onEdit && !isBundled && (
          <button
            onClick={() => onEdit(packageId, componentKey)}
            className="text-xs text-blue-600 hover:underline mt-1"
          >
            edit
          </button>
        )}
      </div>
    );
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center justify-center gap-1">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50 border-b-2 border-border">
            <th className="p-3 text-left font-bold text-sm">Package</th>
            <th className="p-3 text-center font-bold text-sm">Transportation</th>
            <th className="p-3 text-center font-bold text-sm">Room</th>
            <th className="p-3 text-center font-bold text-sm">Equipment</th>
            <th className="p-3 text-center font-bold text-sm">Display</th>
            <th className="p-3 text-center font-bold text-sm">Catering</th>
            <th className="p-3 text-center font-bold text-sm">Staff</th>
            <th className="p-3 text-center font-bold text-sm">Return Transport</th>
            <th className="p-3 text-center font-bold text-sm">Total</th>
            <th className="p-3 text-center font-bold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr
              key={pkg.id}
              className={cn(
                'border-b border-border transition-colors',
                index % 2 === 0 && 'bg-muted/20',
                !pkg.complete && 'bg-red-50/30'
              )}
            >
              {/* Package Info */}
              <td className="p-3">
                <div className="font-semibold text-sm mb-1">Package {index + 1}</div>
                <div className="text-xs text-muted-foreground">{pkg.location}</div>
                {renderRating(pkg.rating)}
                {!pkg.complete && (
                  <div className="mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded inline-block">
                    Incomplete
                  </div>
                )}
              </td>

              {/* Components */}
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.transportation, pkg.id, 'transportation')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.room, pkg.id, 'room')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.equipment, pkg.id, 'equipment')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.display, pkg.id, 'display')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.catering, pkg.id, 'catering')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.staff, pkg.id, 'staff')}</td>
              <td className="p-3 border-l border-border">{renderComponent(pkg.components.returnTransport, pkg.id, 'returnTransport')}</td>

              {/* Total */}
              <td className="p-3 border-l border-border text-center">
                <div className="text-lg font-bold text-blue-900">£{pkg.totalPrice}</div>
              </td>

              {/* Actions */}
              <td className="p-3 border-l border-border text-center">
                {pkg.complete ? (
                  <Button
                    size="sm"
                    onClick={() => onBuy(pkg.id)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Incomplete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
