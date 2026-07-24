import { useEffect } from 'react';
import { BUSINESS_INFO, FAQS } from '../data';

interface SchemaMarkupProps {
  currentPage: string;
}

export default function SchemaMarkup({ currentPage }: SchemaMarkupProps) {
  useEffect(() => {
    // 1. Dynamic Meta Tags
    const title = `${BUSINESS_INFO.name} | ${BUSINESS_INFO.tagline}`;
    const description = `Visit ${BUSINESS_INFO.name} at ${BUSINESS_INFO.location}. Phone: ${BUSINESS_INFO.phone}. We supply 100% genuine medicines, baby care, medical equipment, and health supplements in Gaya, Bihar. Order via WhatsApp!`;
    const keywords = "medical store Gaya, pharmacy Tekari road, New Mantu Pharma Gaya, chemist Bihar, online medicine delivery Gaya, baby products Gaya, buy medicines WhatsApp, genuine medicines, Mantu Kumar pharmacist";

    document.title = currentPage === 'home' ? title : `${currentPage.toUpperCase()} | ${BUSINESS_INFO.name}`;

    // Helper to set or create meta tag
    const setMetaTag = (property: string, content: string, isName = false) => {
      let element = document.querySelector(isName ? `meta[name="${property}"]` : `meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (isName) {
          element.setAttribute('name', property);
        } else {
          element.setAttribute('property', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', description, true);
    setMetaTag('keywords', keywords, true);
    setMetaTag('robots', 'index, follow', true);
    setMetaTag('canonical', window.location.href, true);

    // Open Graph
    setMetaTag('og:title', document.title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', 'website');
    setMetaTag('og:url', window.location.href);
    setMetaTag('og:image', 'https://picsum.photos/seed/mantup_og/1200/630');
    setMetaTag('og:site_name', BUSINESS_INFO.name);

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', document.title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', 'https://picsum.photos/seed/mantup_og/1200/630', true);

    // 2. Dynamic JSON-LD injection
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Schema A: Pharmacy (Local Business)
    const pharmacySchema = {
      "@context": "https://schema.org",
      "@type": "Pharmacy",
      "@id": "https://newmantupharma.gaya/#store",
      "name": BUSINESS_INFO.name,
      "image": "https://picsum.photos/seed/mantustore/800/600",
      "priceRange": "₹₹",
      "telephone": BUSINESS_INFO.phoneFormatted,
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tekari Road",
        "addressLocality": "Gaya",
        "addressRegion": "Bihar",
        "postalCode": "823001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": BUSINESS_INFO.coordinates.lat,
        "longitude": BUSINESS_INFO.coordinates.lng
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://maps.google.com/?q=New+Mantu+Pharma+Tekari+Road+Gaya"
      ]
    };

    // Schema B: FAQPage (10 common pharmacy FAQs)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Schema C: Breadcrumbs
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
          "item": `${window.location.origin}/#${currentPage}`
        }
      ]
    };

    const injectSchema = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    injectSchema(pharmacySchema);
    injectSchema(faqSchema);
    injectSchema(breadcrumbSchema);

    return () => {
      // Clean up scripts on unmount to avoid duplicates
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [currentPage]);

  return null; // Side-effect only
}
