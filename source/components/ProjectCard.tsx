import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { generateSlug } from '@/lib/projectsData';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: 'completed' | 'in-progress' | 'coming-soon';
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  liveUrl,
  githubUrl,
  status,
}: ProjectCardProps) {
  const navigate = useNavigate();
  const slug = generateSlug(title);
  
  return (
    <Card 
      className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan h-full flex flex-col cursor-pointer"
      onClick={() => {
        navigate(`/projects/${slug}`);
      }}
    >
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            {/* Status Badge */}
            {status && status !== 'completed' && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="secondary"
                  className={`${
                    status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                      : 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                  } border backdrop-blur-sm`}
                >
                  {status === 'in-progress' ? (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      In Progress
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Coming Soon
                    </>
                  )}
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-xl sm:text-2xl text-gradient-cyber group-hover:text-primary transition-colors flex-1">
              {title}
            </CardTitle>
            {/* Status Badge for cards without images */}
            {!imageUrl && status && status !== 'completed' && (
              <Badge
                variant="secondary"
                className={`${
                  status === 'in-progress'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                    : 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                } border flex-shrink-0`}
              >
                {status === 'in-progress' ? (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    In Progress
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 mr-1" />
                    Soon
                  </>
                )}
              </Badge>
            )}
          </div>
          <CardDescription className="text-muted-foreground text-sm sm:text-base">
            {description}
          </CardDescription>
        </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            asChild
            disabled={status === 'coming-soon'}
          >
            <Link to={`/projects/${slug}`}>
              {status === 'coming-soon' ? 'Preview' : 'View Details'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {liveUrl && liveUrl !== '#' && status !== 'coming-soon' && (
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
          {githubUrl && githubUrl !== '#' && status !== 'coming-soon' && (
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
