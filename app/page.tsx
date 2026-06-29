"use client";

import { useState, useEffect, useRef } from 'react';
import {
  MousePointer2, Square, Circle, Type, PenTool, Eraser, Droplet,
  User, Briefcase, Code, Mail, GraduationCap, Camera
} from 'lucide-react';

import { GalleryPhoto } from '@/types/portfolio';
import { personalInfo } from '@/data';

// UI Components
import { CustomCursor } from './components/ui/CustomCursor';
import { Lightbox } from './components/ui/Lightbox';
import { BackToTop } from './components/ui/BackToTop';
import { MobilePanel } from './components/ui/MobilePanel';
import { MobileToolBar } from './components/ui/MobileToolBar';

// Layout Components
import { TopBar } from './components/layout/TopBar';
import { OptionsBar } from './components/layout/OptionsBar';
import { SectionNav } from './components/layout/SectionNav';
import { ToolBar } from './components/layout/ToolBar';
import { Footer } from './components/layout/Footer';
import { RightPanel } from './components/layout/RightPanel';

// Section Components
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ContactSection } from './components/sections/ContactSection';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [activeRightPanel, setActiveRightPanel] = useState('layers');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryPhoto | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');
  const [navigationHistory, setNavigationHistory] = useState(['about']);
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState('');
  const [mobileLayersOpen, setMobileLayersOpen] = useState(false);

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const sections = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const brandColors = [
    { name: 'Cyan Primary', hex: '#06B6D4', rgb: 'RGB(6, 182, 212)' },
    { name: 'Blue Accent', hex: '#3B82F6', rgb: 'RGB(59, 130, 246)' },
    { name: 'Purple Accent', hex: '#A855F7', rgb: 'RGB(168, 85, 247)' },
    { name: 'Emerald Accent', hex: '#10B981', rgb: 'RGB(16, 185, 129)' }
  ];

  const galleryPhotos: GalleryPhoto[] = [
    { id: 1, title: "The Chase", caption: "A lioness in pursuit of a warthog across the African savanna - Masai Mara, Kenya", src: "/static/gallery/photo1.jpg" },
    { id: 2, title: "Unicorns in Dusk", caption: "Zebras painted against the dusky African sky - Masai Mara, Kenya", src: "/static/gallery/Zebra Silhouette.jpg" },
    { id: 3, title: "Golden Dust Bath", caption: "An elephant showering itself in the warm glow of the setting sun - Corbett National Park, India", src: "/static/gallery/photo3.jpg" }
  ];

  const tools = [
    { id: 'pointer', icon: MousePointer2, name: 'Move Tool' },
    { id: 'square', icon: Square, name: 'Rectangle Tool' },
    { id: 'circle', icon: Circle, name: 'Ellipse Tool' },
    { id: 'type', icon: Type, name: 'Type Tool' },
    { id: 'pen', icon: PenTool, name: 'Pen Tool' },
    { id: 'eraser', icon: Eraser, name: 'Eraser Tool' },
    { id: 'brush', icon: Droplet, name: 'Brush Tool' }
  ];

  // Custom Cursor Tracking - Optimized with RAF
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setCursorPosition({ x: lastX, y: lastY });
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateLightbox('next');
        }
        return;
      }

      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 6) {
        const section = sections[keyNum - 1];
        if (section) {
          scrollToSection(section.id);
        }
        return;
      }

      const currentIndex = sections.findIndex(s => s.id === activeSection);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1].id);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection('contact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxImage?.id, activeSection]);

  // Touch swipe navigation between sections (mobile) — mirrors the arrow-key nav
  useEffect(() => {
    const main = mainContentRef.current;
    if (!main) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (lightboxOpen) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const elapsed = Date.now() - startTime;

      // Horizontal swipe: X dominant, past threshold, and reasonably quick
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5 && elapsed < 700) {
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        if (dx < 0 && currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1].id); // swipe left → next
        } else if (dx > 0 && currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1].id); // swipe right → prev
        }
      }
    };

    main.addEventListener('touchstart', onTouchStart, { passive: true });
    main.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      main.removeEventListener('touchstart', onTouchStart);
      main.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, lightboxOpen]);

  // Optimized section detection using Intersection Observer
  // Re-run when hiddenSections changes to re-observe newly visible sections
  useEffect(() => {
    const observerOptions = {
      root: mainContentRef.current,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);

          // Reflect active section in the URL without flooding history
          if (window.location.hash !== '#' + sectionId) {
            history.replaceState(null, '', '#' + sectionId);
          }

          setNavigationHistory(prev => {
            if (prev[prev.length - 1] === sectionId) return prev;
            return [...prev, sectionId].slice(-10);
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Small delay to ensure DOM elements are rendered before observing
    const timeoutId = setTimeout(() => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section instanceof Element) observer.observe(section);
      });
    }, 50);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const scrollTop = mainContentRef.current?.scrollTop || 0;
          setShowBackToTop(scrollTop > 500);
          rafId = null;
        });
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [[...hiddenSections].sort()]);

  // Hash-based deep-linking: scroll to the section in the URL hash on mount,
  // and respond to back/forward navigation via popstate.
  useEffect(() => {
    const isValidSection = (id: string) => sections.some(s => s.id === id);

    const scrollToHashSection = (sectionId: string) => {
      sectionsRef.current[sectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    // On initial mount, honor an incoming hash once the DOM is ready
    const initialHash = window.location.hash.slice(1);
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (initialHash && isValidSection(initialHash)) {
      timeoutId = setTimeout(() => scrollToHashSection(initialHash), 50);
    }

    // pushState/replaceState do not fire popstate, so this won't loop
    const handlePopState = () => {
      const sectionId = window.location.hash.slice(1);
      if (sectionId && isValidSection(sectionId)) {
        scrollToHashSection(sectionId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener('popstate', handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Announce the active section to screen readers via the live region
  useEffect(() => {
    const section = sections.find(s => s.id === activeSection);
    if (section) {
      setAnnouncement(`${section.label} section`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    setNavigationHistory(prev => [...prev, sectionId].slice(-10));
    // Explicit navigation pushes a history entry so back/forward works
    if (window.location.hash !== '#' + sectionId) {
      history.pushState(null, '', '#' + sectionId);
    }
    sectionsRef.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (photo: GalleryPhoto) => {
    setLightboxImage(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!lightboxImage) return;
    const currentIndex = galleryPhotos.findIndex(p => p.id === lightboxImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryPhotos.length;
    } else {
      newIndex = currentIndex === 0 ? galleryPhotos.length - 1 : currentIndex - 1;
    }
    setLightboxImage(galleryPhotos[newIndex]);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setHiddenSections(prev => {
      const newSet = new Set(prev);
      const willBeHidden = !newSet.has(sectionId);
      if (willBeHidden) {
        newSet.add(sectionId);
      } else {
        newSet.delete(sectionId);
      }
      const label = sections.find(s => s.id === sectionId)?.label ?? sectionId;
      setAnnouncement(`${label} ${willBeHidden ? 'hidden' : 'shown'}`);
      return newSet;
    });
  };

  return (
    <div className="h-dvh flex flex-col bg-[#535353] text-slate-200 overflow-hidden">
      {/* Skip to content link - visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-600 focus:text-white focus:font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Skip to content
      </a>

      {/* Custom Cursor */}
      <CustomCursor
        cursorPosition={cursorPosition}
        cursorVariant={cursorVariant}
        selectedTool={selectedTool}
        tools={tools}
      />

      {/* Top Bar */}
      <TopBar
        scrollToSection={scrollToSection}
        setCursorVariant={setCursorVariant}
      />

      {/* Options Bar */}
      <OptionsBar
        scrollToSection={scrollToSection}
        setCursorVariant={setCursorVariant}
      />

      {/* Section Navigation */}
      <SectionNav
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setCursorVariant={setCursorVariant}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <ToolBar
          tools={tools}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          setCursorVariant={setCursorVariant}
        />

        {/* Main Content */}
        <main
          id="main-content"
          ref={mainContentRef}
          tabIndex={-1}
          className="flex-1 bg-[#242424] overflow-y-auto scroll-smooth"
          role="main"
        >
          <div className="max-w-6xl mx-auto px-6 py-16 md:px-8 md:py-10 space-y-18 pb-28 md:pb-16">
            {!hiddenSections.has('about') && (
              <div className="transition-opacity duration-500">
                <AboutSection
                  sectionsRef={sectionsRef}
                  scrollToSection={scrollToSection}
                  setCursorVariant={setCursorVariant}
                />
              </div>
            )}

            {!hiddenSections.has('about') && !hiddenSections.has('experience') && (
              <hr className="border-slate-700/50" aria-hidden="true" />
            )}

            {!hiddenSections.has('experience') && (
              <div className="transition-opacity duration-500">
                <ExperienceSection sectionsRef={sectionsRef} />
              </div>
            )}

            {!hiddenSections.has('experience') && !hiddenSections.has('projects') && (
              <hr className="border-slate-700/50" aria-hidden="true" />
            )}

            {!hiddenSections.has('projects') && (
              <div className="transition-opacity duration-500">
                <ProjectsSection
                  sectionsRef={sectionsRef}
                  setCursorVariant={setCursorVariant}
                />
              </div>
            )}

            {!hiddenSections.has('projects') && !hiddenSections.has('education') && (
              <hr className="border-slate-700/50" aria-hidden="true" />
            )}

            {!hiddenSections.has('education') && (
              <div className="transition-opacity duration-500">
                <EducationSection sectionsRef={sectionsRef} />
              </div>
            )}

            {!hiddenSections.has('education') && !hiddenSections.has('gallery') && (
              <hr className="border-slate-700/50" aria-hidden="true" />
            )}

            {!hiddenSections.has('gallery') && (
              <div className="transition-opacity duration-500">
                <GallerySection
                  sectionsRef={sectionsRef}
                  galleryPhotos={galleryPhotos}
                  openLightbox={openLightbox}
                  setCursorVariant={setCursorVariant}
                />
              </div>
            )}

            {!hiddenSections.has('gallery') && !hiddenSections.has('contact') && (
              <hr className="border-slate-700/50" aria-hidden="true" />
            )}

            {!hiddenSections.has('contact') && (
              <div className="transition-opacity duration-500">
                <ContactSection
                  sectionsRef={sectionsRef}
                  setCursorVariant={setCursorVariant}
                />
              </div>
            )}
          </div>
        </main>

        {/* Right Panel */}
        <RightPanel
          activeRightPanel={activeRightPanel}
          setActiveRightPanel={setActiveRightPanel}
          navigationHistory={navigationHistory}
          sections={sections}
          brandColors={brandColors}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          setCursorVariant={setCursorVariant}
          personalInfo={personalInfo}
          hiddenSections={hiddenSections}
          onToggleVisibility={toggleSectionVisibility}
        />
      </div>

      {/* Footer */}
      <Footer activeSection={activeSection} />

      {/* Back to Top Button */}
      <BackToTop
        show={showBackToTop}
        onClick={scrollToTop}
        setCursorVariant={setCursorVariant}
      />

      {/* Lightbox */}
      {lightboxOpen && lightboxImage && (
        <Lightbox
          lightboxImage={lightboxImage}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}

      {/* Mobile Tool Bar - Primary navigation on phones */}
      <MobileToolBar
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onOpenLayers={() => setMobileLayersOpen(true)}
      />

      {/* Mobile Panel - Only visible on small screens */}
      <MobilePanel
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        hiddenSections={hiddenSections}
        onToggleVisibility={toggleSectionVisibility}
        isOpen={mobileLayersOpen}
        onClose={() => setMobileLayersOpen(false)}
      />

      {/* Screen-reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
    </div>
  );
};

export default Portfolio;