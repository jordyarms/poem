import { useState } from 'react';
import { Plus, Package, Building, Laptop, UtensilsCrossed, Users, Car } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import RequirementCard from '@/components/poems/RequirementCard';
import { Button } from '@/components/ui/button';
import {
  locationOptions,
  roomOptions,
  equipmentOptions,
  cateringOptions,
  staffRoleOptions,
  transportOptions,
} from '@/data/mockData';

interface Requirement {
  id: string;
  type: 'room' | 'equipment' | 'catering' | 'staff' | 'transportation';
  data: Record<string, any>;
  alignedWith?: string | null;
}

const requirementIcons = {
  room: <Building className="w-5 h-5" />,
  equipment: <Laptop className="w-5 h-5" />,
  catering: <UtensilsCrossed className="w-5 h-5" />,
  staff: <Users className="w-5 h-5" />,
  transportation: <Car className="w-5 h-5" />,
};

const requirementTitles = {
  room: 'Room/Venue',
  equipment: 'Equipment',
  catering: 'Catering',
  staff: 'Staff',
  transportation: 'Transportation',
};

export default function Requirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'req-1',
      type: 'room',
      data: { location: '', capacity: '', date: '', time: '', duration: '' },
    },
  ]);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const addRequirement = (type: Requirement['type']) => {
    const newReq: Requirement = {
      id: `req-${Date.now()}`,
      type,
      data: {},
    };
    setRequirements([...requirements, newReq]);
    setShowAddMenu(false);
  };

  const removeRequirement = (id: string) => {
    setRequirements(requirements.filter((req) => req.id !== id));
  };

  const updateRequirementData = (id: string, field: string, value: any) => {
    setRequirements(
      requirements.map((req) =>
        req.id === id ? { ...req, data: { ...req.data, [field]: value } } : req
      )
    );
  };

  const updateAlignment = (id: string, alignWithId: string | null) => {
    setRequirements(
      requirements.map((req) => (req.id === id ? { ...req, alignedWith: alignWithId } : req))
    );
  };

  const getAlignmentOptions = (currentReqId: string) => {
    return requirements
      .filter((req) => req.id !== currentReqId && req.type === 'room')
      .map((req) => ({
        id: req.id,
        label: `${requirementTitles[req.type]} (Req #${req.id.slice(-4)})`,
      }));
  };

  const renderRequirementFields = (req: Requirement) => {
    const updateData = (field: string, value: any) => updateRequirementData(req.id, field, value);

    const baseFields = (
      <>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            value={req.data.location || ''}
            onChange={(e) => updateData('location', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!!req.alignedWith}
          >
            <option value="">Select location...</option>
            {locationOptions.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={req.data.date || ''}
              onChange={(e) => updateData('date', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!!req.alignedWith}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={req.data.time || ''}
              onChange={(e) => updateData('time', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!!req.alignedWith}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration (hours)</label>
          <input
            type="number"
            value={req.data.duration || ''}
            onChange={(e) => updateData('duration', e.target.value)}
            placeholder="4"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </>
    );

    switch (req.type) {
      case 'room':
        return (
          <>
            {baseFields}
            <div>
              <label className="block text-sm font-medium mb-1">Room Type & Capacity</label>
              <select
                value={req.data.roomType || ''}
                onChange={(e) => updateData('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select room...</option>
                {roomOptions.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label} - ${room.price}
                  </option>
                ))}
              </select>
            </div>
          </>
        );

      case 'equipment':
        return (
          <>
            {baseFields}
            <div>
              <label className="block text-sm font-medium mb-1">Equipment Type</label>
              <select
                value={req.data.equipmentType || ''}
                onChange={(e) => updateData('equipmentType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select equipment...</option>
                {equipmentOptions.map((equip) => (
                  <option key={equip.value} value={equip.value}>
                    {equip.label} - ${equip.price}
                  </option>
                ))}
              </select>
            </div>
          </>
        );

      case 'catering':
        return (
          <>
            {baseFields}
            <div>
              <label className="block text-sm font-medium mb-1">Catering Type</label>
              <select
                value={req.data.cateringType || ''}
                onChange={(e) => updateData('cateringType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select catering...</option>
                {cateringOptions.map((cater) => (
                  <option key={cater.value} value={cater.value}>
                    {cater.label} - ${cater.pricePerPerson}/person
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Headcount</label>
              <input
                type="number"
                value={req.data.headcount || ''}
                onChange={(e) => updateData('headcount', e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        );

      case 'staff':
        return (
          <>
            {baseFields}
            <div>
              <label className="block text-sm font-medium mb-1">Staff Role</label>
              <select
                value={req.data.roleType || ''}
                onChange={(e) => updateData('roleType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select role...</option>
                {staffRoleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label} - ${role.rate}/hr
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Staff</label>
              <input
                type="number"
                value={req.data.count || ''}
                onChange={(e) => updateData('count', e.target.value)}
                placeholder="2"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        );

      case 'transportation':
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <select
                  value={req.data.fromLocation || ''}
                  onChange={(e) => updateData('fromLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select...</option>
                  {locationOptions.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <select
                  value={req.data.toLocation || ''}
                  onChange={(e) => updateData('toLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select...</option>
                  {locationOptions.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={req.data.date || ''}
                  onChange={(e) => updateData('date', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={req.data.time || ''}
                  onChange={(e) => updateData('time', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Transport Type</label>
              <select
                value={req.data.transportType || ''}
                onChange={(e) => updateData('transportType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select transport...</option>
                {transportOptions.map((transport) => (
                  <option key={transport.value} value={transport.value}>
                    {transport.label} - ${transport.pricePerTrip}
                  </option>
                ))}
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              My Requirements
            </h1>
            <p className="text-muted-foreground mt-1">
              Build your multi-resource booking by adding and chaining requirements
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Packages
            </Button>
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {requirements.map((req) => (
              <RequirementCard
                key={req.id}
                id={req.id.slice(-4)}
                title={requirementTitles[req.type]}
                icon={requirementIcons[req.type]}
                onRemove={() => removeRequirement(req.id)}
                canAlignWith={req.type !== 'room' ? getAlignmentOptions(req.id) : undefined}
                onAlignChange={(alignWithId) => updateAlignment(req.id, alignWithId)}
                alignedWith={req.alignedWith}
              >
                {renderRequirementFields(req)}
              </RequirementCard>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Requirement Button */}
        <div className="relative">
          {showAddMenu && (
            <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-2 gap-2 min-w-[300px]">
                <Button
                  variant="outline"
                  onClick={() => addRequirement('room')}
                  className="justify-start"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Room/Venue
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addRequirement('equipment')}
                  className="justify-start"
                >
                  <Laptop className="w-4 h-4 mr-2" />
                  Equipment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addRequirement('catering')}
                  className="justify-start"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Catering
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addRequirement('staff')}
                  className="justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Staff
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addRequirement('transportation')}
                  className="justify-start col-span-2"
                >
                  <Car className="w-4 h-4 mr-2" />
                  Transportation
                </Button>
              </div>
            </div>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full border-dashed border-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Requirement
          </Button>
        </div>
      </div>
    </div>
  );
}
