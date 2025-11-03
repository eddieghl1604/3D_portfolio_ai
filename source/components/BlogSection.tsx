import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, TrendingUp, Shield, Zap } from 'lucide-react';

export default function BlogSection() {
  const posts = [
    {
      icon: TrendingUp,
      title: 'DeFi Market Analysis Q1 2025',
      date: '2025-01-15',
      preview: 'Deep dive into decentralized finance trends, yield farming strategies, and emerging protocols reshaping the landscape.',
      tags: ['DeFi', 'Analysis', 'Trading'],
    },
    {
      icon: Shield,
      title: 'Smart Contract Security Best Practices',
      date: '2025-01-10',
      preview: 'Essential security patterns and audit techniques for building bulletproof smart contracts in the Web3 ecosystem.',
      tags: ['Security', 'Blockchain', 'Development'],
    },
    {
      icon: Zap,
      title: 'High-Frequency Trading in Crypto Markets',
      date: '2024-12-28',
      preview: 'Exploring algorithmic trading strategies, latency optimization, and risk management in volatile crypto markets.',
      tags: ['Trading', 'Python', 'Automation'],
    },
  ];

  return (
    <section id="blog" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="text-gradient-cyber">Crypto</span>
              <span className="text-gradient-gold">-Terminal</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights on FinTech, Crypto, Trading & Risk Management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => {
            const Icon = post.icon;
            return (
              <Card
                key={post.title}
                className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
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
            <span className="text-primary font-mono text-sm">
              {'> '} More insights coming soon...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
