'use client';

import { type ReactNode } from 'react';
import { Shield, LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AppShellProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Tab[];
  showTabs?: boolean;
}

export function AppShell({ children, activeTab, onTabChange, tabs, showTabs = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fg">ShieldKit</h1>
                <p className="text-xs text-text-muted">Web3 Security</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showTabs && (
        <nav className="sticky bottom-0 glass-card border-t border-gray-700">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-around py-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-accent'
                        : 'text-text-muted hover:text-fg'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
