'use client';

import { useState } from 'react';
import { Star, AlertTriangle, ThumbsUp, MessageSquare, Flag, TrendingUp } from 'lucide-react';

interface Review {
  id: string;
  contractAddress: string;
  contractName: string;
  rating: number;
  comment: string;
  isWarning: boolean;
  upvotes: number;
  author: string;
  timestamp: string;
  verified: boolean;
}

export function ReputationFeed() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'warnings' | 'verified'>('all');
  const [showAddReview, setShowAddReview] = useState(false);

  const mockReviews: Review[] = [
    {
      id: '1',
      contractAddress: '0x1234...5678',
      contractName: 'UniswapV3Pool',
      rating: 5,
      comment: 'Verified contract, safe to use. Been using for months without issues.',
      isWarning: false,
      upvotes: 42,
      author: 'alice.eth',
      timestamp: '2 hours ago',
      verified: true,
    },
    {
      id: '2',
      contractAddress: '0xabcd...efgh',
      contractName: 'SuspiciousToken',
      rating: 1,
      comment: 'WARNING: This is a honeypot! Cannot sell tokens after buying. Lost 0.5 ETH.',
      isWarning: true,
      upvotes: 128,
      author: 'bob.base',
      timestamp: '5 hours ago',
      verified: false,
    },
    {
      id: '3',
      contractAddress: '0x9876...5432',
      contractName: 'LendingProtocol',
      rating: 4,
      comment: 'Good protocol but high gas fees. Audit report looks solid.',
      isWarning: false,
      upvotes: 23,
      author: 'charlie.eth',
      timestamp: '1 day ago',
      verified: true,
    },
  ];

  const filteredReviews = mockReviews.filter(review => {
    if (activeFilter === 'warnings') return review.isWarning;
    if (activeFilter === 'verified') return review.verified;
    return true;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-accent text-accent' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-fg">Contract Reputation</h2>
        <p className="text-text-muted">
          Community-driven safety ratings and reviews
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'all'
              ? 'bg-accent text-bg'
              : 'bg-surface text-text-muted hover:bg-surface-hover'
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => setActiveFilter('warnings')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
            activeFilter === 'warnings'
              ? 'bg-danger text-white'
              : 'bg-surface text-text-muted hover:bg-surface-hover'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Warnings
        </button>
        <button
          onClick={() => setActiveFilter('verified')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'verified'
              ? 'bg-primary text-white'
              : 'bg-surface text-text-muted hover:bg-surface-hover'
          }`}
        >
          Verified Only
        </button>
      </div>

      {/* Add Review Button */}
      <button
        onClick={() => setShowAddReview(!showAddReview)}
        className="btn-primary w-full"
      >
        + Add Review
      </button>

      {/* Add Review Form */}
      {showAddReview && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold text-fg">Submit Contract Review</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-fg">Contract Address</label>
            <input
              type="text"
              placeholder="0x..."
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-fg">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-gray-600 hover:text-accent" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-fg">Your Review</label>
            <textarea
              placeholder="Share your experience..."
              rows={4}
              className="input-field resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="warning" className="w-4 h-4" />
            <label htmlFor="warning" className="text-sm text-fg">
              Mark as warning (scam/honeypot)
            </label>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary flex-1">Submit Review</button>
            <button
              onClick={() => setShowAddReview(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews Feed */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={`glass-card p-6 space-y-4 ${
              review.isWarning ? 'border-danger' : ''
            }`}
            style={review.isWarning ? { borderWidth: '2px' } : {}}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-fg">{review.contractName}</h3>
                  {review.verified && (
                    <span className="text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                  {review.isWarning && (
                    <span className="text-xs bg-danger bg-opacity-20 text-danger px-2 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Warning
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-muted font-mono">{review.contractAddress}</p>
              </div>
              {renderStars(review.rating)}
            </div>

            {/* Review Content */}
            <p className="text-fg leading-relaxed">{review.comment}</p>

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.upvotes}</span>
                </button>
                <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
                <button className="flex items-center gap-2 text-text-muted hover:text-danger transition-colors">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">Report</span>
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-fg">{review.author}</p>
                <p className="text-xs text-text-muted">{review.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Contracts */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-fg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Trending Contracts
        </h3>
        <div className="space-y-3">
          {[
            { name: 'UniswapV3', rating: 4.8, reviews: 234 },
            { name: 'AaveV3', rating: 4.9, reviews: 189 },
            { name: 'CurveFinance', rating: 4.7, reviews: 156 },
          ].map((contract, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-hover transition-all duration-200 cursor-pointer"
            >
              <div>
                <p className="font-medium text-fg">{contract.name}</p>
                <p className="text-sm text-text-muted">{contract.reviews} reviews</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-fg">{contract.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
