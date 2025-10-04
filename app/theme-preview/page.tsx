'use client';

import { useTheme } from '../components/ThemeProvider';
import { Shield, Star, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'ShieldKit (Default)', description: 'Professional finance theme' },
    { id: 'celo', name: 'CELO', description: 'Black & yellow, sharp borders' },
    { id: 'solana', name: 'Solana', description: 'Purple gradient, rounded' },
    { id: 'base', name: 'Base', description: 'Blue theme, modern' },
    { id: 'coinbase', name: 'Coinbase', description: 'Navy blue, subtle' },
  ];

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-fg">Theme Preview</h1>
          <p className="text-text-muted">
            Choose your preferred theme for ShieldKit
          </p>
        </div>

        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`glass-card p-6 text-left space-y-2 transition-all duration-200 ${
                theme === t.id ? 'ring-2 ring-accent' : ''
              }`}
            >
              <h3 className="font-semibold text-fg">{t.name}</h3>
              <p className="text-sm text-text-muted">{t.description}</p>
              {theme === t.id && (
                <span className="inline-block text-xs bg-accent text-bg px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-fg">Component Preview</h2>

          {/* Buttons */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-danger">Danger Button</button>
            </div>
          </div>

          {/* Risk Badges */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Risk Badges</h3>
            <div className="flex flex-wrap gap-3">
              <span className="risk-badge-safe">SAFE</span>
              <span className="risk-badge-warning">WARNING</span>
              <span className="risk-badge-danger">DANGER</span>
            </div>
          </div>

          {/* Cards */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="font-medium text-fg">Safe Transaction</h4>
                </div>
                <p className="text-sm text-text-muted">
                  This transaction appears to be safe
                </p>
              </div>
              <div className="glass-card p-4 space-y-2 border-danger" style={{ borderWidth: '2px' }}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <h4 className="font-medium text-fg">High Risk</h4>
                </div>
                <p className="text-sm text-text-muted">
                  Multiple threats detected
                </p>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Icons</h3>
            <div className="flex gap-6">
              <Shield className="w-8 h-8 text-accent" />
              <Star className="w-8 h-8 text-accent fill-accent" />
              <AlertTriangle className="w-8 h-8 text-warning" />
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          {/* Typography */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Typography</h3>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-fg">Heading 1</h1>
              <h2 className="text-2xl font-bold text-fg">Heading 2</h2>
              <h3 className="text-xl font-semibold text-fg">Heading 3</h3>
              <p className="text-base text-fg">Body text</p>
              <p className="text-sm text-text-muted">Muted text</p>
              <p className="text-xs text-text-muted">Caption text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
