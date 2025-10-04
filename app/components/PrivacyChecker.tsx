'use client';

import { useState } from 'react';
import { Lock, Eye, AlertTriangle, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import { privacyService } from '@/app/lib/privacy';
import { ensAPI } from '@/app/lib/api/ens';
import { PrivacyReport } from '@/app/types';

interface PrivacyReport {
  walletAddress: string;
  riskLevel: 'low' | 'medium' | 'high';
  exposedPII: {
    type: string;
    value: string;
    risk: string;
  }[];
  recommendations: string[];
}

export function PrivacyChecker() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [report, setReport] = useState<PrivacyReport | null>(null);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);

  const handleCheck = async () => {
    if (!walletAddress.trim()) return;

    setIsChecking(true);
    setReport(null);
    setShowPremiumPrompt(false);

    try {
      // Resolve ENS name if provided
      let resolvedAddress = walletAddress;
      if (walletAddress.includes('.eth')) {
        const resolved = await ensAPI.resolveName(walletAddress);
        if (!resolved) {
          throw new Error('ENS name could not be resolved');
        }
        resolvedAddress = resolved;
      }

      // Perform privacy analysis
      const privacyReport = await privacyService.analyzeWalletPrivacy(resolvedAddress);

      setReport({
        walletAddress: resolvedAddress,
        riskLevel: privacyReport.riskLevel,
        exposedPII: privacyReport.exposedPII.map(pii => ({
          type: pii.type,
          value: pii.value,
          risk: pii.description, // Map to the expected format
        })),
        recommendations: privacyReport.recommendations,
      });
    } catch (error) {
      console.error('Privacy check failed:', error);

      // Show error report
      const errorReport: PrivacyReport = {
        walletAddress,
        riskLevel: 'high',
        exposedPII: [{
          type: 'Error',
          value: 'Analysis Failed',
          risk: error instanceof Error ? error.message : 'Unknown error occurred',
        }],
        recommendations: ['Try again later or contact support'],
      };

      setReport(errorReport);
    } finally {
      setIsChecking(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-danger';
      default:
        return 'text-text-muted';
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return 'risk-badge-safe';
      case 'medium':
        return 'risk-badge-warning';
      case 'high':
        return 'risk-badge-danger';
      default:
        return 'risk-badge-warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-fg">Privacy Checker</h2>
        <p className="text-text-muted">
          Analyze what personal information your wallet exposes
        </p>
      </div>

      {/* Check Input */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-fg">
            Wallet Address or ENS Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x... or name.eth"
              className="input-field pr-12"
            />
            <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          </div>
        </div>

        <button
          onClick={handleCheck}
          disabled={isChecking || !walletAddress.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Check Privacy
            </>
          )}
        </button>
      </div>

      {/* Privacy Report */}
      {report && (
        <div className="space-y-4">
          {/* Risk Overview */}
          <div className={`glass-card p-6 space-y-4 ${
            report.riskLevel === 'high' ? 'border-danger' : 
            report.riskLevel === 'medium' ? 'border-warning' : 
            'border-green-400'
          }`} style={{ borderWidth: '2px' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-fg">Privacy Risk Level</h3>
                <p className="text-sm text-text-muted">Based on exposed information</p>
              </div>
              <span className={getRiskBadge(report.riskLevel)}>
                {report.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Exposed PII */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Exposed Personal Information
            </h3>
            <div className="space-y-3">
              {report.exposedPII.map((pii, index) => (
                <div key={index} className="p-4 bg-surface rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-fg">{pii.type}</span>
                    <span className="text-sm text-accent">{pii.value}</span>
                  </div>
                  <p className="text-sm text-text-muted flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    {pii.risk}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Privacy Recommendations
            </h3>
            <ul className="space-y-3">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-text-muted">
                  <span className="text-accent mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Cleanup */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-fg">Deep Privacy Cleanup</h3>
                <p className="text-sm text-text-muted">
                  Scan data brokers and submit removal requests
                </p>
              </div>
              <span className="text-accent font-bold">0.001 ETH</span>
            </div>
            <button
              onClick={() => setShowPremiumPrompt(true)}
              className="btn-primary w-full"
            >
              Start Deep Cleanup
            </button>
          </div>

          {/* External Tools */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Privacy Tools</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-surface rounded-lg hover:bg-surface-hover transition-all duration-200 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-medium text-fg">Revoke Token Approvals</p>
                  <p className="text-sm text-text-muted">Remove unlimited approvals</p>
                </div>
                <ExternalLink className="w-5 h-5 text-text-muted" />
              </button>
              <button className="w-full p-4 bg-surface rounded-lg hover:bg-surface-hover transition-all duration-200 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-medium text-fg">Privacy Mixer</p>
                  <p className="text-sm text-text-muted">Break transaction links</p>
                </div>
                <ExternalLink className="w-5 h-5 text-text-muted" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tips */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-fg">Privacy Best Practices</h3>
        <div className="space-y-3">
          {[
            'Use different wallets for different purposes',
            'Avoid linking social media to your main wallet',
            'Be cautious with POAP collections',
            'Consider using privacy-focused chains',
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-surface rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-muted">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
