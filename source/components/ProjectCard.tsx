import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl text-gradient-cyber">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          {liveUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
