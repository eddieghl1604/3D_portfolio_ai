import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import GlitchText from './GlitchText';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('⚡ Transaction Confirmed! Message sent to the blockchain.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Mail, label: 'Email', url: 'mailto:hello@cryptoportfolio.com' },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <GlitchText text="INITIATE" className="text-gradient-cyber" />
            {' '}
            <span className="text-gradient-gold">CONNECTION</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's build something revolutionary together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="hologram-panel matrix-effect animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient-cyber">
                <GlitchText text="Send Message" />
              </CardTitle>
              <CardDescription>Transmitting to secure channel - Response within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-glow-cyan matrix-effect"
                  size="lg"
                >
                  ⚡ Transmit Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="hologram-panel">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient-gold">Connect</CardTitle>
                <CardDescription>Let's connect on social media</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all group"
                    >
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-foreground font-medium">{social.label}</span>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="hologram-panel">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 animate-float">⚡</div>
                <h3 className="text-xl font-bold mb-2 text-gradient-neon">
                  <GlitchText text="AVAILABLE FOR PROJECTS" />
                </h3>
                <p className="text-muted-foreground">
                  Open for FinTech, DeFi, and Cyberpunk Web3 ventures
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
