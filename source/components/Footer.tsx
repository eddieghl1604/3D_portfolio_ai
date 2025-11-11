import { Github, Linkedin, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // If we're on a different route (not home), navigate to home first
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/', { state: { skipLoading: true, scrollTo: sectionId } });
    }
  };

  return (
    <footer className="relative pt-8 sm:pt-12 pb-6 sm:pb-8 bg-black/60 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left: Logo + description */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-3 sm:mb-4">
              <img
                src="/assets/xrypto.png"
                alt="xrypto logo"
                className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3 object-contain rounded-lg"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-100">Portfolio</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto sm:mx-0">
              Building exceptional digital experiences with passion and precision.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-gray-200 text-sm sm:text-base">About</a></li>
              <li><a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className="hover:text-gray-200 text-sm sm:text-base">Skills</a></li>
              <li><a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="hover:text-gray-200 text-sm sm:text-base">Projects</a></li>
              <li><a href="#blog" onClick={(e) => handleLinkClick(e, 'blog')} className="hover:text-gray-200 text-sm sm:text-base">Blog</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-gray-200 text-sm sm:text-base">Contact</a></li>
            </ul>
          </div>

          {/* Right: Connect */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">Connect</h4>
            <div className="flex items-center justify-center sm:justify-start space-x-4 text-gray-400">
              <a href="https://github.com/eddieghl1604" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-200"><Github className="w-5 h-5 sm:w-6 sm:h-6" /></a>
              <a href="https://my.linkedin.com/in/eddie-ghl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-200"><Linkedin className="w-5 h-5 sm:w-6 sm:h-6" /></a>
              <a href="mailto:eddieghl1604@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:text-gray-200"><Mail className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-gray-400 text-center">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
