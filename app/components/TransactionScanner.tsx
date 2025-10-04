'use client';

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react';

interface ScanResult {
  riskScore: number;
  riskLevel: 'safe' | 'warning' | 'danger';
  threats: string[];
  contractAge: string;
  communityRating: number;
  details: {
    isHoneypot: boolean;
    hasUnverifiedCode: boolean;
    hasHighRiskApprovals: boolean;
    suspiciousPatterns: string[];
  };
}

export function TransactionScanner() {
  const [txInput, setTxInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);

  const handleScan = async () => {
    if (!txInput.trim()) return;

    setIsScanning(true);
    setScanResult(null);
    setShowPremiumPrompt(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock scan result
    const mockResult: ScanResult = {
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: Math.random() > 0.7 ? 'danger' : Math.random() > 0.4 ? 'warning' : 'safe',
      threats: [
        'Unlimited token approval detected',
        'Contract not verified on Etherscan',
        'Similar to known scam pattern',
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      contractAge: '12 days',
      communityRating: 2.5,
      details: {
        isHoneypot: Math.random() > 0.8,
        hasUnverifiedCode: Math.random() > 0.6,
        hasHighRiskApprovals: Math.random() > 0.5,
        suspiciousPatterns: ['Drainer pattern detected', 'Unusual gas usage'],
      },
    };

    setScanResult(mockResult);
    setIsScanning(false);
  };

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case 'safe':
        return 'risk-badge-safe';
      case 'warning':
        return 'risk-badge-warning';
      case 'danger':
        return 'risk-badge-danger';
      default:
        return 'risk-badge-warning';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case 'danger':
        return <XCircle className="w-6 h-6 text-danger" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-warning" />;
    }
  };

  const getRiskMessage = (level: string) => {
    switch (level) {
      case 'safe':
        return 'Safe to Sign';
      case 'warning':
        return 'Proceed with Caution';
      case 'danger':
        return 'High Risk - Do Not Sign';
      default:
        return 'Unknown Risk';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-fg">Transaction Scanner</h2>
        <p className="text-text-muted">
          Scan transactions before signing to detect threats and scams
        </p>
      </div>

      {/* Scan Input */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-fg">
            Transaction Hash or Contract Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={txInput}
              onChange={(e) => setTxInput(e.target.value)}
              placeholder="0x..."
              className="input-field pr-12"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning || !txInput.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Scan Transaction
            </>
          )}
        </button>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="space-y-4">
          {/* Risk Score Card */}
          <div className={`glass-card p-6 space-y-4 ${
            scanResult.riskLevel === 'danger' ? 'border-danger' : 
            scanResult.riskLevel === 'warning' ? 'border-warning' : 
            'border-green-400'
          }`} style={{ borderWidth: '2px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRiskIcon(scanResult.riskLevel)}
                <div>
                  <h3 className="text-xl font-bold text-fg">
                    {getRiskMessage(scanResult.riskLevel)}
                  </h3>
                  <p className="text-sm text-text-muted">Risk Score: {scanResult.riskScore}/100</p>
                </div>
              </div>
              <span className={getRiskBadgeClass(scanResult.riskLevel)}>
                {scanResult.riskLevel.toUpperCase()}
              </span>
            </div>

            {/* Risk Progress Bar */}
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  scanResult.riskLevel === 'danger' ? 'bg-danger' :
                  scanResult.riskLevel === 'warning' ? 'bg-warning' :
                  'bg-green-400'
                }`}
                style={{ width: `${scanResult.riskScore}%` }}
              />
            </div>
          </div>

          {/* Threat Details */}
          {scanResult.threats.length > 0 && (
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-fg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Detected Threats
              </h3>
              <ul className="space-y-2">
                {scanResult.threats.map((threat, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="text-danger mt-1">•</span>
                    <span>{threat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contract Info */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-fg">Contract Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-muted">Contract Age</p>
                <p className="text-lg font-semibold text-fg">{scanResult.contractAge}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Community Rating</p>
                <p className="text-lg font-semibold text-fg">
                  {scanResult.communityRating}/5.0 ⭐
                </p>
              </div>
            </div>
          </div>

          {/* Premium Report Prompt */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-fg">Detailed Security Report</h3>
                <p className="text-sm text-text-muted">
                  Get full threat analysis and mitigation steps
                </p>
              </div>
              <span className="text-accent font-bold">0.0001 ETH</span>
            </div>
            <button
              onClick={() => setShowPremiumPrompt(true)}
              className="btn-primary w-full"
            >
              Unlock Full Report
            </button>
          </div>

          {/* View on Explorer */}
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <ExternalLink className="w-5 h-5" />
            View on Basescan
          </button>
        </div>
      )}

      {/* Recent Scans */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-fg">Recent Scans</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-hover transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-fg">0x1234...5678</p>
                  <p className="text-xs text-text-muted">2 hours ago</p>
                </div>
              </div>
              <span className="risk-badge-safe">SAFE</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
