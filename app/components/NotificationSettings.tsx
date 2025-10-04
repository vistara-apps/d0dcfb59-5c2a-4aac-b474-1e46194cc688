'use client';

import { useState } from 'react';
import { Bell, BellOff, Shield, AlertTriangle, TrendingUp, Award } from 'lucide-react';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  category: 'security' | 'community' | 'personal';
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'contract-flagged',
      title: 'Contract Flagged',
      description: 'Get notified when a contract you interacted with gets flagged as risky',
      icon: AlertTriangle,
      enabled: true,
      category: 'security',
    },
    {
      id: 'new-threat',
      title: 'New Threat Detected',
      description: 'Alerts about emerging scam patterns and security threats',
      icon: Shield,
      enabled: true,
      category: 'security',
    },
    {
      id: 'unusual-activity',
      title: 'Unusual Wallet Activity',
      description: 'Notifications for suspicious transactions or approvals',
      icon: AlertTriangle,
      enabled: true,
      category: 'security',
    },
    {
      id: 'weekly-digest',
      title: 'Weekly Security Digest',
      description: 'Summary of new threats, top-rated contracts, and your scan history',
      icon: TrendingUp,
      enabled: false,
      category: 'community',
    },
    {
      id: 'reputation-milestone',
      title: 'Reputation Milestones',
      description: 'Celebrate when you earn badges and reach new reputation levels',
      icon: Award,
      enabled: true,
      category: 'personal',
    },
    {
      id: 'review-response',
      title: 'Review Responses',
      description: 'Get notified when someone replies to your contract reviews',
      icon: Bell,
      enabled: false,
      category: 'community',
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const enabledCount = preferences.filter(p => p.enabled).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security':
        return 'text-danger';
      case 'community':
        return 'text-primary';
      case 'personal':
        return 'text-accent';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-fg">Notification Settings</h2>
        <p className="text-text-muted">
          Manage your security alerts and updates
        </p>
      </div>

      {/* Overview Card */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
              <Bell className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-fg">Notifications Active</h3>
              <p className="text-sm text-text-muted">
                {enabledCount} of {preferences.length} enabled
              </p>
            </div>
          </div>
          <button className="btn-secondary">
            Test Notification
          </button>
        </div>
      </div>

      {/* Security Notifications */}
      <div className="space-y-4">
        <h3 className="font-semibold text-fg flex items-center gap-2">
          <Shield className="w-5 h-5 text-danger" />
          Security Alerts
        </h3>
        <div className="space-y-3">
          {preferences
            .filter(p => p.category === 'security')
            .map((pref) => {
              const Icon = pref.icon;
              return (
                <div key={pref.id} className="glass-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center ${getCategoryColor(pref.category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-fg">{pref.title}</h4>
                        <p className="text-sm text-text-muted mt-1">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference(pref.id)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                        pref.enabled ? 'bg-accent' : 'bg-surface'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                          pref.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Community Notifications */}
      <div className="space-y-4">
        <h3 className="font-semibold text-fg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Community Updates
        </h3>
        <div className="space-y-3">
          {preferences
            .filter(p => p.category === 'community')
            .map((pref) => {
              const Icon = pref.icon;
              return (
                <div key={pref.id} className="glass-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center ${getCategoryColor(pref.category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-fg">{pref.title}</h4>
                        <p className="text-sm text-text-muted mt-1">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference(pref.id)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                        pref.enabled ? 'bg-accent' : 'bg-surface'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                          pref.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Personal Notifications */}
      <div className="space-y-4">
        <h3 className="font-semibold text-fg flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Personal Achievements
        </h3>
        <div className="space-y-3">
          {preferences
            .filter(p => p.category === 'personal')
            .map((pref) => {
              const Icon = pref.icon;
              return (
                <div key={pref.id} className="glass-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center ${getCategoryColor(pref.category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-fg">{pref.title}</h4>
                        <p className="text-sm text-text-muted mt-1">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePreference(pref.id)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                        pref.enabled ? 'bg-accent' : 'bg-surface'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                          pref.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Notification History */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-fg">Recent Notifications</h3>
        <div className="space-y-3">
          {[
            {
              title: 'Contract Flagged',
              message: 'UniswapV2Router has been flagged by 5 users',
              time: '2 hours ago',
              type: 'warning',
            },
            {
              title: 'Weekly Digest',
              message: 'Your security summary is ready',
              time: '1 day ago',
              type: 'info',
            },
            {
              title: 'New Badge Earned',
              message: 'You earned the "Trusted Reviewer" badge!',
              time: '3 days ago',
              type: 'success',
            },
          ].map((notif, index) => (
            <div
              key={index}
              className="p-4 bg-surface rounded-lg hover:bg-surface-hover transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notif.type === 'warning' ? 'bg-warning' :
                  notif.type === 'success' ? 'bg-green-400' :
                  'bg-primary'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-fg">{notif.title}</h4>
                  <p className="text-sm text-text-muted mt-1">{notif.message}</p>
                  <p className="text-xs text-text-muted mt-2">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-fg">Quiet Hours</h3>
            <p className="text-sm text-text-muted">Pause non-critical notifications</p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <BellOff className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}
