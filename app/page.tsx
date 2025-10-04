'use client';

import { useEffect, useState } from 'react';
import { Shield, Search, Users, Lock, Bell } from 'lucide-react';
import { AppShell } from './components/AppShell';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TransactionScanner } from './components/TransactionScanner';
import { ReputationFeed } from './components/ReputationFeed';
import { PrivacyChecker } from './components/PrivacyChecker';
import { NotificationSettings } from './components/NotificationSettings';

type Tab = 'welcome' | 'scan' | 'reputation' | 'privacy' | 'notifications';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('welcome');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome screen
    const welcomed = localStorage.getItem('shieldkit_welcomed');
    if (welcomed) {
      setHasSeenWelcome(true);
      setActiveTab('scan');
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem('shieldkit_welcomed', 'true');
    setHasSeenWelcome(true);
    setActiveTab('scan');
  };

  const tabs = [
    { id: 'scan' as Tab, label: 'Scan', icon: Search },
    { id: 'reputation' as Tab, label: 'Reputation', icon: Users },
    { id: 'privacy' as Tab, label: 'Privacy', icon: Lock },
    { id: 'notifications' as Tab, label: 'Alerts', icon: Bell },
  ];

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      showTabs={hasSeenWelcome}
    >
      {!hasSeenWelcome && activeTab === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      
      {hasSeenWelcome && (
        <>
          {activeTab === 'scan' && <TransactionScanner />}
          {activeTab === 'reputation' && <ReputationFeed />}
          {activeTab === 'privacy' && <PrivacyChecker />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </>
      )}
    </AppShell>
  );
}
