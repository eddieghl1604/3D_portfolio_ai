import { motion } from 'framer-motion';
import { TrendingUp, Code, Bitcoin } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Finance & Trading',
      icon: TrendingUp,
      color: 'text-gradient-gold',
      skills: [
        { name: 'Quantitative Analysis', level: 95 },
        { name: 'Risk Management', level: 90 },
        { name: 'Market Microstructure', level: 85 },
        { name: 'Portfolio Optimization', level: 88 },
      ],
    },
    {
      title: 'Technology',
      icon: Code,
      color: 'text-gradient-cyber',
      skills: [
        { name: 'Python / TypeScript', level: 92 },
        { name: 'React / Next.js', level: 88 },
        { name: 'Three.js / WebGL', level: 85 },
        { name: 'Node.js / APIs', level: 90 },
      ],
    },
    {
      title: 'Blockchain',
      icon: Bitcoin,
      color: 'text-gradient-neon',
      skills: [
        { name: 'Smart Contracts', level: 87 },
        { name: 'DeFi Protocols', level: 90 },
        { name: 'Web3 Integration', level: 92 },
        { name: 'Tokenomics', level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">Skills</span>{' '}
            <span className="text-gradient-gold">HUD</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Multi-Dimensional Expertise Matrix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="hologram-panel rounded-lg p-4 sm:p-6"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg border border-primary/30 mr-2 sm:mr-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${category.color}`}>
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-foreground font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-primary font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute inset-y-0 left-0 bg-gradient-cyber rounded-full"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute inset-y-0 left-0 bg-primary opacity-50 blur-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
