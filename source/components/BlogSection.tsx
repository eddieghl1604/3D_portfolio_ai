import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, TrendingUp, Shield, Zap, Sparkles, Clock } from 'lucide-react';

export default function BlogSection() {
  const posts = [
    {
      icon: TrendingUp,
      title: 'DeFi Market Analysis Q1 2025',
      date: 'Coming Soon',
      preview: 'Deep dive into decentralized finance trends, yield farming strategies, and emerging protocols reshaping the landscape.',
      tags: ['DeFi', 'Analysis', 'Trading'],
      status: 'coming-soon' as const,
    },
    {
      icon: Shield,
      title: 'Smart Contract Security Best Practices',
      date: 'Coming Soon',
      preview: 'Essential security patterns and audit techniques for building bulletproof smart contracts in the Web3 ecosystem.',
      tags: ['Security', 'Blockchain', 'Development'],
      status: 'coming-soon' as const,
    },
    {
      icon: Zap,
      title: 'High-Frequency Trading in Crypto Markets',
      date: 'Coming Soon',
      preview: 'Exploring algorithmic trading strategies, latency optimization, and risk management in volatile crypto markets.',
      tags: ['Trading', 'Python', 'Automation'],
      status: 'coming-soon' as const,
    },
  ];

  return (
    <section id="blog" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-gradient-cyber">Crypto</span>
              <span className="text-gradient-gold">-Terminal</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights on FinTech, Crypto, Trading & Risk Management
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => {
            const Icon = post.icon;
            return (
              <Card
                key={post.title}
                className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan cursor-pointer group animate-fade-in relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Coming Soon Badge */}
                {post.status === 'coming-soon' && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-400 border-purple-500/50 border backdrop-blur-sm"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/30">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-gradient-cyber group-hover:glow-cyan transition-all">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {post.preview}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-muted/50 backdrop-blur border border-primary/30 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary font-mono text-sm">
                Content is currently in development. More insights coming soon...
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
