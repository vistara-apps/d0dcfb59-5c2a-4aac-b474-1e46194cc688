'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { paymentService } from '@/app/lib/payments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description: string;
  amount: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  feature,
  description,
  amount,
  onSuccess,
  onError,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setStatus('processing');
    setErrorMessage('');

    try {
      const paymentRequest = {
        amount,
        currency: 'ETH' as const,
        description,
      };

      const result = await paymentService.processPayment(paymentRequest);

      if (result.success && result.txHash) {
        setStatus('success');
        onSuccess?.(result.txHash);

        // Auto-close after success
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        const error = result.error || 'Payment failed';
        setErrorMessage(error);
        onError?.(error);
      }
    } catch (error) {
      setStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-fg">Premium Feature</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-fg mb-2">{feature}</h4>
            <p className="text-text-muted">{description}</p>
          </div>

          <div className="bg-surface p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Amount:</span>
              <span className="text-xl font-bold text-accent">{amount} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Network:</span>
              <span className="text-fg">Base</span>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'processing' && (
            <div className="flex items-center gap-3 p-4 bg-primary bg-opacity-10 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-fg">Processing payment...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-3 p-4 bg-green-500 bg-opacity-10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-fg">Payment successful!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-danger bg-opacity-10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-danger" />
              <span className="text-fg">{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {status === 'idle' && (
            <>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay {amount} ETH
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isProcessing}
              >
                Cancel
              </button>
            </>
          )}

          {status === 'error' && (
            <button
              onClick={() => setStatus('idle')}
              className="btn-primary w-full"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-text-muted text-center">
          Payments are processed instantly via your Base wallet
        </p>
      </div>
    </div>
  );
}

