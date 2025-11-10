import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, TrendingUp, Code2, Database, Server, Zap, Target, Rocket, Lightbulb, AlertCircle, ArrowUp, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getProjectBySlug, projectsData, generateSlug } from '@/lib/projectsData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ImageLightbox from '@/components/ImageLightbox';
import { useEffect, useState } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const project = slug ? getProjectBySlug(slug) : null;
  const galleryImages = project?.galleryImages || (project?.imageUrl ? [project.imageUrl] : []);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [slug]);

  // Generate structured data for SEO
  useEffect(() => {
    if (!project) return;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      creator: {
        '@type': 'Person',
        name: 'Eddie Gan',
      },
      datePublished: new Date().toISOString(),
      keywords: project.technologies.join(', '),
      ...(project.imageUrl && {
        image: project.imageUrl,
      }),
    };

    // Remove existing structured data script
    const existingScript = document.getElementById('project-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.id = 'project-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateMetaTag('og:title', project.title);
    updateMetaTag('og:description', project.description);
    updateMetaTag('og:type', 'website');
    if (project.imageUrl) {
      updateMetaTag('og:image', project.imageUrl);
    }

    // Update page title
    document.title = `${project.title} | Eddie Gan Portfolio`;

    return () => {
      // Cleanup
      const scriptToRemove = document.getElementById('project-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [project]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (lightboxIndex < galleryImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  // Get related projects
  const relatedProjects = project?.relatedProjects
    ? projectsData.filter((p) => project.relatedProjects?.includes(p.title))
    : [];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gradient-cyber">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isInProgress = project.status === 'in-progress';
  const isComingSoon = project.status === 'coming-soon';
  const hasFullDetails = project.status === 'completed' || (!project.status && (project.overview || project.problem));

  return (
    <div className="relative min-h-screen bg-background">
      <Navigation />
      
      {/* Section Indicators */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {['hero', 'gallery', 'overview', 'technical', 'challenges', 'cta'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary transition-all"
            aria-label={`Scroll to ${section}`}
          />
        ))}
      </div>

      <main className="pt-20 pb-16">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl mb-8">
          <Button
            variant="ghost"
            onClick={() => {
              navigate('/', { state: { skipLoading: true, scrollTo: 'projects' } });
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>

        {/* 1. Hero Section */}
        <section id="hero" className="relative mb-16">
          <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
            {(project.imageUrl || project.videoUrl) && (
              <>
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    poster={project.imageUrl}
                  />
                ) : (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </>
            )}
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-6xl pb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gradient-cyber">{project.title}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-6 max-w-3xl">
                {project.description}
              </p>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <TooltipProvider>
                  {project.technologies.map((tech) => (
                    <Tooltip key={tech}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="px-4 py-2 bg-primary/10 border-primary/30 text-primary text-sm hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Used in {project.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <Button size="lg" asChild className="border-glow-cyan">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <Button size="lg" variant="outline" asChild className="border-primary/30">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16">
          {/* Status Banner for In-Progress/Coming Soon Projects */}
          {(isInProgress || isComingSoon) && (
            <Card className={`hologram-panel ${isInProgress ? 'border-yellow-500/50' : 'border-purple-500/50'} border-2`}>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isInProgress ? (
                    <>
                      <Clock className="h-8 w-8 text-yellow-400 animate-pulse" />
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 text-lg px-4 py-2">
                        In Progress
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 text-lg px-4 py-2">
                        Coming Soon
                      </Badge>
                    </>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-cyber">
                  {isInProgress ? 'Project Under Active Development' : 'Project Preview'}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                  {isInProgress
                    ? 'This project is currently being developed. Detailed information, technical specifications, and outcomes will be available upon completion. Stay tuned for updates!'
                    : 'This project is in the planning phase. Full details, features, and documentation will be added as development progresses.'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/', { state: { skipLoading: true, scrollTo: 'contact' } });
                    }}
                    className="border-primary/30"
                  >
                    Get Updates
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/', { state: { skipLoading: true, scrollTo: 'projects' } });
                    }}
                  >
                    View Other Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 2. Project Gallery */}
          {galleryImages.length > 0 && (
            <section id="gallery" className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-cyber">Project Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer border border-primary/20 hover:border-primary/50 transition-all"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                        Click to enlarge
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. Project Overview & Objectives - Only show if project has full details */}
          {hasFullDetails && (project.overview || project.objectives) && (
            <section id="overview" className="scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {project.overview && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gradient-cyber flex items-center gap-2">
                        <Target className="h-6 w-6" />
                        Project Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-lg">{project.overview}</p>
                    </CardContent>
                  </Card>
                )}
                
                {project.objectives && project.objectives.length > 0 && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gradient-gold flex items-center gap-2">
                        <Rocket className="h-6 w-6" />
                        Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          )}

          {/* 4. Development Process - Only show if project has full details */}
          {hasFullDetails && project.developmentProcess && project.developmentProcess.length > 0 && (
            <section className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-neon">Development Process</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
                <div className="space-y-8">
                  {project.developmentProcess.map((step, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <Card className="hologram-panel ml-4">
                        <CardContent className="pt-6">
                          <p className="text-muted-foreground">{step}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 5. Key Features - Only show if project has full details */}
          {hasFullDetails && project.keyFeatures && project.keyFeatures.length > 0 && (
            <section className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-cyber">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <Card key={index} className="hologram-panel border-glow-cyan">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* 6. Technical Details - Only show if project has full details */}
          {hasFullDetails && project.technicalSpecs && (
            <section id="technical" className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-gold">Technical Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {project.technicalSpecs.architecture && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-primary" />
                        Architecture
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.technicalSpecs.architecture}</p>
                    </CardContent>
                  </Card>
                )}
                
                {project.technicalSpecs.frontend && project.technicalSpecs.frontend.length > 0 && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        Frontend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technicalSpecs.frontend.map((tech) => (
                          <Badge key={tech} variant="outline" className="bg-primary/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {project.technicalSpecs.backend && project.technicalSpecs.backend.length > 0 && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-primary" />
                        Backend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technicalSpecs.backend.map((tech) => (
                          <Badge key={tech} variant="outline" className="bg-primary/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {project.technicalSpecs.database && (
                  <Card className="hologram-panel">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Database
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.technicalSpecs.database}</p>
                    </CardContent>
                  </Card>
                )}
                
                {project.technicalSpecs.deployment && (
                  <Card className="hologram-panel lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-primary" />
                        Deployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.technicalSpecs.deployment}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          )}

          {/* 7. Performance Metrics - Only show if project has full details */}
          {hasFullDetails && project.performanceMetrics && project.performanceMetrics.length > 0 && (
            <section className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-neon">Performance Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.performanceMetrics.map((metric, index) => (
                  <Card key={index} className="hologram-panel border-glow-purple">
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-gradient-cyber mb-2">{metric.value}</p>
                      <p className="text-muted-foreground">{metric.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* 8. Challenges & Solutions - Only show if project has full details */}
          {hasFullDetails && project.challenges && project.challenges.length > 0 && (
            <section id="challenges" className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-cyber">Challenges & Solutions</h2>
              <div className="space-y-6">
                {project.challenges.map((item, index) => (
                  <Card key={index} className="hologram-panel">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">Challenge</h3>
                          <p className="text-muted-foreground mb-4">{item.challenge}</p>
                          <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            Solution
                          </h3>
                          <p className="text-muted-foreground">{item.solution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* 9. Future Improvements - Only show if project has full details */}
          {hasFullDetails && project.futureImprovements && project.futureImprovements.length > 0 && (
            <section className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient-gold">Future Improvements</h2>
              <Card className="hologram-panel">
                <CardContent className="pt-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.futureImprovements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 10. CTA Section */}
          <section id="cta" className="scroll-mt-20">
            <Card className="hologram-panel border-glow-purple">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-cyber">
                  Interested in This Project?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can bring similar solutions to your business or explore collaboration opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <Button size="lg" asChild className="border-glow-cyan">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  <Button
                    size="lg"
                    onClick={() => {
                      navigate('/', { state: { skipLoading: true, scrollTo: 'contact' } });
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground border-glow-cyan"
                  >
                    Contact Me About This Project
                  </Button>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-primary/20">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Related Projects</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {relatedProjects.map((relatedProject) => (
                        <Button
                          key={relatedProject.title}
                          variant="outline"
                          onClick={() => {
                            navigate(`/projects/${generateSlug(relatedProject.title)}`);
                          }}
                          className="border-primary/30 hover:border-primary"
                        >
                          {relatedProject.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />

      {/* Image Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
