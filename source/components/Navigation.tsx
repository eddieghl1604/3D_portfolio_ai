import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Blog', href: '#blog', id: 'blog' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    // If we're on a different route (not home), navigate to home first
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/', { state: { skipLoading: true, scrollTo: itemId } });
      setIsOpen(false);
    } else {
      // On home page, let default hash navigation work
      setIsOpen(false);
    }
  };

  const handleDownloadResume = () => {
    const resumeUrl = '/assets/EddieCVGan.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'EddieCVGan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gradient-cyber" onClick={(e) => handleNavClick(e, 'home')}>
              <img
                src="/assets/xrypto.png"
                alt="logo"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mr-2 sm:mr-3 object-contain flex-shrink-0"
              />
              <span className="whitespace-nowrap">PORTFOLIO</span>
            </a>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-xs lg:text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground/80 hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </a>
                );
              })}

              <Button
                variant="default"
                size="sm"
                onClick={handleDownloadResume}
                className="ml-2 text-xs lg:text-sm"
              >
                <span className="hidden lg:inline">Download Resume</span>
                <span className="lg:hidden">Resume</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 px-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-2xl sm:text-3xl font-bold transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              className="mt-4"
            >
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
