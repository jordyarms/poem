import { useTheme } from '@/contexts/ThemeContext';
import { Briefcase, Users, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ModeSwitcher() {
  const { viewMode, setViewMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    {
      value: 'worker' as const,
      label: 'Worker View',
      icon: Briefcase,
      userName: 'Yvonne Chen',
      org: 'Springfield Workers Co-op',
      color: 'emerald',
      description: 'Individual worker perspective',
    },
    {
      value: 'business' as const,
      label: 'Business View',
      icon: Users,
      userName: 'Mark Anderson',
      org: 'Acme Insights Inc',
      color: 'blue',
      description: 'Business/employer perspective',
    },
  ];

  const currentMode = modes.find((m) => m.value === viewMode)!;
  const Icon = currentMode.icon;

  return (
    <div className="relative">
      {/* Current Mode Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-3 px-4 py-2 rounded-lg border-2 transition-all',
          viewMode === 'worker'
            ? 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
            : 'bg-blue-50 border-blue-300 hover:bg-blue-100'
        )}
      >
        <Icon
          className={cn('w-5 h-5', viewMode === 'worker' ? 'text-emerald-600' : 'text-blue-600')}
        />
        <div className="text-left">
          <div className="text-xs text-muted-foreground">Viewing as</div>
          <div className="font-semibold text-sm">{currentMode.label}</div>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180',
            viewMode === 'worker' ? 'text-emerald-600' : 'text-blue-600'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <div className="p-3 bg-muted/50 border-b border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Switch View Mode
                </p>
              </div>

              {modes.map((mode) => {
                const ModeIcon = mode.icon;
                const isActive = mode.value === viewMode;

                return (
                  <button
                    key={mode.value}
                    onClick={() => {
                      setViewMode(mode.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-start gap-3 p-4 transition-colors text-left',
                      isActive
                        ? mode.value === 'worker'
                          ? 'bg-emerald-50 hover:bg-emerald-100'
                          : 'bg-blue-50 hover:bg-blue-100'
                        : 'hover:bg-muted/50'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        mode.value === 'worker' ? 'bg-emerald-100' : 'bg-blue-100'
                      )}
                    >
                      <ModeIcon
                        className={cn(
                          'w-5 h-5',
                          mode.value === 'worker' ? 'text-emerald-600' : 'text-blue-600'
                        )}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{mode.label}</span>
                        {isActive && (
                          <span
                            className={cn(
                              'px-2 py-0.5 text-xs font-medium rounded-full',
                              mode.value === 'worker'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-blue-600 text-white'
                            )}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{mode.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold',
                            mode.value === 'worker' ? 'bg-emerald-600' : 'bg-blue-600'
                          )}
                        >
                          {mode.userName.split(' ')[0][0]}
                          {mode.userName.split(' ')[1][0]}
                        </div>
                        <div>
                          <div className="font-medium">{mode.userName}</div>
                          <div className="text-muted-foreground">{mode.org}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="p-3 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Tip:</strong> Each view shows different screens and features relevant
                  to that user type.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
