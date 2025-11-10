import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/lib/projectsData';

export default function ProjectsSection() {
  const [selectedTech, setSelectedTech] = useState('All');
  const projects = projectsData;

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') return projects;
    return projects.filter((project) =>
      project.technologies.some(
        (tech) => tech.toLowerCase() === selectedTech.toLowerCase()
      )
    );
  }, [selectedTech]);

  const handleFilterChange = (tech: string) => {
    setSelectedTech(tech);
  };

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">Featured</span>{' '}
            <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative blockchain solutions and immersive digital experiences
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              variant={selectedTech === tech ? 'default' : 'outline'}
              size="sm"
              className={`transition-all ${
                selectedTech === tech
                  ? 'bg-primary text-primary-foreground border-glow-cyan'
                  : 'border-primary/30 hover:border-primary/50'
              }`}
            >
              {tech}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found for this technology. Try selecting a different filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
