'use client';

import { useState } from 'react';
import { Shield, Search, Users, Lock, ChevronRight, Bell } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      title: 'Welcome to ShieldKit',
      description: 'Your pocket security consultant for Web3 and beyond. Protect your digital identity and assets with real-time security intelligence.',
      color: 'text-accent',
    },
    {
      icon: Search,
      title: 'Transaction Scanner',
      description: 'Scan transactions before signing to detect malicious approvals, drainers, and risky contracts. Get instant risk scores and threat analysis.',
      color: 'text-primary',
    },
    {
      icon: Users,
      title: 'Community Reputation',
      description: 'Crowdsourced safety ratings for smart contracts and dApps. Share experiences and learn from the community to avoid scams.',
      color: 'text-green-400',
    },
    {
      icon: Lock,
      title: 'Privacy Protection',
      description: 'Check what personal information your wallet exposes. Get actionable tips to maintain pseudonymity and protect your identity.',
      color: 'text-warning',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={`w-24 h-24 rounded-full bg-surface flex items-center justify-center ${currentSlideData.color}`}>
            <Icon className="w-12 h-12" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-fg">{currentSlideData.title}</h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {currentSlideData.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-accent w-8'
                  : 'bg-surface-hover'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Enable Notifications Prompt */}
        {currentSlide === slides.length - 1 && (
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-accent" />
              <div className="text-left flex-1">
                <h3 className="font-semibold text-fg">Enable Notifications</h3>
                <p className="text-sm text-text-muted">Get alerts for security threats</p>
              </div>
            </div>
            <button className="btn-secondary w-full text-sm">
              Enable Alerts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
