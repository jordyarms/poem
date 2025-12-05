import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Briefcase, Clock, DollarSign, Award, FileText, Tag, Download } from 'lucide-react';
import { WorkerProfile } from '@/types';
import ReliabilityBadge from './ReliabilityBadge';
import { Button } from '@/components/ui/button';

interface WorkerDetailPanelProps {
  worker: WorkerProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkerDetailPanel({ worker, isOpen, onClose }: WorkerDetailPanelProps) {
  if (!worker) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-gray-900 border-l border-border shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-border p-6 flex items-start justify-between z-10">
              <div className="flex items-start gap-4 flex-1">
                {worker.photo && (
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{worker.name}</h2>
                  <p className="text-sm text-muted-foreground">{worker.agency}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{worker.rating.toFixed(1)}</span>
                    </div>
                    <ReliabilityBadge grade={worker.rank} size="sm" />
                    {worker.roleMatch && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        Role Match
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Briefcase className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-blue-900">{worker.ourBookings}</div>
                  <div className="text-xs text-blue-700">Our Bookings</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-blue-900">{worker.ourHours}</div>
                  <div className="text-xs text-blue-700">Our Hours</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-blue-900">${worker.rate}</div>
                  <div className="text-xs text-blue-700">Per Hour</div>
                </div>
              </div>

              {/* Reference Code */}
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Reference Code</p>
                <p className="font-mono font-semibold">{worker.refCode}</p>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  About
                </h3>
                <p className="text-sm leading-relaxed">{worker.bio}</p>
              </div>

              {/* Activity in System */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Activity in System
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold">{worker.activityInSystem.clients}</div>
                    <div className="text-xs text-muted-foreground">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{worker.activityInSystem.bookings}</div>
                    <div className="text-xs text-muted-foreground">Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{worker.activityInSystem.hoursSold}</div>
                    <div className="text-xs text-muted-foreground">Hours Sold</div>
                  </div>
                </div>
              </div>

              {/* Temp Work Outside */}
              {worker.tempWorkOutside && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    Other Temp Work
                  </h3>
                  <p className="text-sm">{worker.tempWorkOutside}</p>
                </div>
              )}

              {/* Credentials */}
              {worker.credentials.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Credentials
                  </h3>
                  <div className="space-y-2">
                    {worker.credentials.map((credential, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm bg-emerald-50 text-emerald-700 px-3 py-2 rounded-md"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {credential}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {worker.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Skills & Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {worker.documents.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {worker.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        className="flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{doc.name}</span>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-border p-6 z-10">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  View Full Profile
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Select Worker
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
