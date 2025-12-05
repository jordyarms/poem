import { useState } from 'react';
import { Sparkles, TrendingUp, Users, Award, Heart } from 'lucide-react';
import OpportunityFeedCard from '@/components/poems/OpportunityFeedCard';
import { Button } from '@/components/ui/button';
import { mockOpportunityFeed } from '@/data/mockData';

type SortOption = 'newest' | 'relevance' | 'endDate';

export default function Opportunities() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Group opportunities by category
  const investmentOpportunities = mockOpportunityFeed.filter((o) => o.category === 'investment');
  const buyersOpportunities = mockOpportunityFeed.filter((o) => o.category === 'buyers');
  const benefitsOpportunities = mockOpportunityFeed.filter((o) => o.category === 'benefits');
  const socialOpportunities = mockOpportunityFeed.filter((o) => o.category === 'social');

  const handleViewDetails = (id: string) => {
    console.log('View details for opportunity:', id);
    // In a real app, this would navigate to a detail page or open a modal
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              My Opportunity Feed
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover investment, training, benefits, and social opportunities tailored for you
            </p>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 bg-card border border-border rounded-lg p-1">
            <Button
              variant={sortBy === 'newest' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('newest')}
              className={sortBy === 'newest' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Newest
            </Button>
            <Button
              variant={sortBy === 'relevance' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('relevance')}
              className={sortBy === 'relevance' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Relevance
            </Button>
            <Button
              variant={sortBy === 'endDate' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('endDate')}
              className={sortBy === 'endDate' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              End Date
            </Button>
          </div>
        </div>

        {/* Investment Opportunities */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Investment Opportunities</h2>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
              {investmentOpportunities.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentOpportunities.map((opportunity) => (
              <OpportunityFeedCard
                key={opportunity.id}
                opportunity={opportunity}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Buyers (Job Opportunities) */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Buyers Looking for You</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {buyersOpportunities.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyersOpportunities.map((opportunity) => (
              <OpportunityFeedCard
                key={opportunity.id}
                opportunity={opportunity}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold">Benefits & Perks</h2>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
              {benefitsOpportunities.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsOpportunities.map((opportunity) => (
              <OpportunityFeedCard
                key={opportunity.id}
                opportunity={opportunity}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Social Opportunities */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold">Social & Networking</h2>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
              {socialOpportunities.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialOpportunities.map((opportunity) => (
              <OpportunityFeedCard
                key={opportunity.id}
                opportunity={opportunity}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
