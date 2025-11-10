import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = 'Eddie Gan - Blockchain Developer & 3D Specialist',
  description = 'Innovative blockchain solutions and 3D web experiences. Specializing in cryptocurrency platforms, DeFi, smart contracts, and immersive digital experiences.',
  image = '/og-image.png',
  url = 'https://yourportfolio.com'
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

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

    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', 'website');

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', image);
  }, [title, description, image, url]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eddie Gan',
    jobTitle: 'Blockchain Developer & 3D Specialist',
    url: url,
    sameAs: [
      'https://github.com/eddieghl1604',
      'https://my.linkedin.com/in/eddie-ghl',
      'mailto:eddieghl1604@gmail.com'
    ],
    knowsAbout: [
      'Blockchain Development',
      'Smart Contracts',
      'DeFi',
      'Web3',
      '3D Web Development',
      'React',
      'TypeScript',
      'Solidity',
      'Python',
      'Three.js'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Your University/Institution'
    },
    email: 'eddieghl1604@gmail.com',
    description: description
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eddie Gan Portfolio',
    url: url,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Eddie Gan'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  );
}

