"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  MousePointer2, Square, Circle, Type, PenTool, Eraser, Droplet,
  Eye, Layers, MoreHorizontal, Search, Minus, X, Maximize2, 
  User, Briefcase, Code, Mail, Github, Linkedin, Camera,
  Award, GraduationCap, MapPin, Calendar, Download, ExternalLink,
  Settings, FileText, Zap, Cloud, GitBranch, BookOpen, ChevronUp,
  ChevronLeft, ChevronRight, Clock, Palette
} from 'lucide-react';

import  { personalInfo, education, experience, projects, skillCategories, contactMethods, seekingOpportunities } from '@/data';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [activeRightPanel, setActiveRightPanel] = useState('layers');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [navigationHistory, setNavigationHistory] = useState(['about']);
  const [selectedTool, setSelectedTool] = useState('pointer');
  
  const sectionsRef = useRef({});
  const mainContentRef = useRef(null);

  const sections = [
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const rightPanels = [
    { id: 'history', label: 'History', icon: Clock },
    { id: 'color', label: 'Color', icon: Palette },
    { id: 'layers', label: 'Layers', icon: Layers },
    { id: 'properties', label: 'Properties', icon: Settings }
  ];

  const brandColors = [
    { name: 'Cyan Primary', hex: '#06B6D4', rgb: 'RGB(6, 182, 212)' },
    { name: 'Blue Accent', hex: '#3B82F6', rgb: 'RGB(59, 130, 246)' },
    { name: 'Purple Accent', hex: '#A855F7', rgb: 'RGB(168, 85, 247)' },
    { name: 'Emerald Accent', hex: '#10B981', rgb: 'RGB(16, 185, 129)' }
  ];

  const galleryPhotos = [
    { id: 1, title: "The Chase", caption: "A lioness chasing a warthog", src: "/static/gallery/photo1.jpg" },
    { id: 2, title: "Unicorns", caption: "Zebra silhouette in the dusk", src: "/static/gallery/Zebra Silhouette.jpg" },
    { id: 3, title: "Elephant Holi", caption: "An elephant dust bathing in the golden light", src: "/static/gallery/photo3.jpg" }
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

  const iconMap = {
    'zap': Zap,
    'code': Code,
    'cloud': Cloud,
    'git-branch': GitBranch,
    'mail': Mail,
    'github': Github,
    'linkedin': Linkedin,
    'file-text': FileText
  };

  // Custom Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // P1 Feature: Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // When lightbox is open, only handle lightbox navigation
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

      // Number keys 1-6 for section navigation
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 6) {
        const section = sections[keyNum - 1];
        if (section) {
          scrollToSection(section.id);
        }
        return;
      }

      // Arrow keys for navigation  
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
  }, [lightboxOpen, activeSection]); // Dependencies needed for current values

  // Scroll handler for active section detection and back to top
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;
      
      const scrollTop = mainContentRef.current.scrollTop;
      setShowBackToTop(scrollTop > 500);

      // Find active section based on scroll position
      let currentSection = 'about';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = sectionsRef.current[section.id];
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const containerRect = mainContentRef.current.getBoundingClientRect();
          
          // If section top is above the 200px mark from container top, it's active
          if (rect.top - containerRect.top < 200) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);

      setNavigationHistory(prev => {
        // if same as the last recorded section, don't update
        if (prev[prev.length - 1] === currentSection) return prev;

        // otherwise, append and cap at 10 entries
        return [...prev, currentSection].slice(-10);
      });
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
    }
    
    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Empty dependency array - only set up once

  const scrollToSection = (sectionId) => {
    // P0: Add to navigation history
    setNavigationHistory(prev => [...prev, sectionId].slice(-10));
    
    sectionsRef.current[sectionId]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (photo) => {
    setLightboxImage(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const navigateLightbox = (direction) => {
    const currentIndex = galleryPhotos.findIndex(p => p.id === lightboxImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryPhotos.length;
    } else {
      newIndex = currentIndex === 0 ? galleryPhotos.length - 1 : currentIndex - 1;
    }
    setLightboxImage(galleryPhotos[newIndex]);
  };

  return (
    <div className="h-screen flex flex-col bg-[#535353] text-slate-200 overflow-hidden cursor-none">
      {/* P0: Custom Photoshop Cursor */}
      <div 
        className="fixed pointer-events-none z-50 transition-transform duration-100"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`transition-all duration-200 ${cursorVariant === 'hover' ? 'scale-110' : 'scale-100'}`}>
          {(() => {
            const activeTool = tools.find(t => t.id === selectedTool);
            const ToolIcon = activeTool ? activeTool.icon : MousePointer2;
            return <ToolIcon className="w-5 h-5 text-cyan-400 drop-shadow-lg" />;
          })()}
        </div>
      </div>

      {/* Skip to main content */}
      <div className="bg-[#464646] border-b border-black/30 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#31A8FF] to-[#0078D4] rounded flex items-center justify-center text-white font-bold text-xs shadow-lg" aria-hidden="true">
              Ps
            </div>
            <span className="text-slate-300 sm:inline font-medium">Photoshop {new Date().getFullYear()}</span>
          </div>
          <nav className="hidden md:flex gap-3 text-slate-300" aria-label="Top menu">
            {['File', 'Edit', 'Image', 'Layer', 'Type', 'Select', 'Filter', 'View', 'Window', 'Help'].map(menu => (
              <button key={menu} className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline">{menu}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-white hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded" aria-label="Minimize">
            <Minus className="w-4 h-4" />
          </button>
          <button className="text-slate-400 hover:text-white hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded" aria-label="Maximize">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="text-slate-400 hover:text-red-400 hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tool Options Bar */}
      <div className="bg-[#3C3C3C] border-b border-black/20 px-4 py-2.5 flex items-center gap-3 text-sm overflow-x-auto">
        <div className="flex items-center gap-2">
          <label htmlFor="layer-select" className="text-slate-400 text-xs">Select:</label>
          <select id="layer-select" className="bg-[#2C2C2C] text-slate-300 px-2 py-1 rounded text-xs border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Active Layers</option>
          </select>
        </div>
        <div className="h-4 w-px bg-slate-600" aria-hidden="true" />
        <span className="text-slate-300 whitespace-nowrap font-medium">{personalInfo.name}</span>
        <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
        <span className="text-slate-400 whitespace-nowrap hidden sm:inline text-xs">M.S. Computer Science @ Northeastern</span>
        <div className="ml-auto flex items-center gap-3">
          <a 
            href="#" 
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs font-medium cursor-pointer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <button 
            onClick={() => scrollToSection('contact')}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="px-5 py-2 bg-[#1473E6] hover:bg-[#0D66D0] text-white rounded-lg text-xs font-semibold transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Section Navigation Bar */}
      <nav className="bg-[#2C2C2C] border-b border-black/30 flex items-center overflow-x-auto" aria-label="Section navigation">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={`min-w-max px-6 py-3 text-xs border-r border-black/30 flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 cursor-pointer ${
              activeSection === section.id 
                ? 'bg-[#242424] text-white border-b-2 border-cyan-500 font-semibold' 
                : 'bg-[#2C2C2C] text-slate-400 hover:text-white hover:bg-[#323232]'
            }`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            <section.icon className="w-4 h-4" aria-hidden="true" />
            <span>{section.label}.psd</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar - Decorative */}
        <div className="w-12 bg-[#323232] border-r border-black/30 hidden sm:flex flex-col items-center py-3 gap-1" aria-hidden="true">
          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isActive = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`w-10 h-10 flex items-center justify-center rounded transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#3C3C3C] text-white' 
                    : 'text-slate-500 hover:bg-[#3C3C3C] hover:text-white'
                }`}
                title={tool.name}
                aria-label={tool.name}
              >
                <ToolIcon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Main Scrollable Canvas Area */}
        <main 
          id="main-content"
          ref={mainContentRef}
          className="flex-1 bg-[#242424] overflow-y-auto scroll-smooth"
          role="main"
        >
          <div className="max-w-6xl mx-auto px-6 py-16 md:px-8 md:py-10 space-y-18">
            
            {/* About Section - Adjustment Layer Effect */}
            <section 
              id="about" 
              ref={el => sectionsRef.current['about'] = el} 
              className="scroll-mt-4"
              style={{ filter: 'brightness(1.05) contrast(1.02)' }}
              aria-labelledby="about-heading"
            >
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 md:p-10 border border-slate-700/50 shadow-2xl">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                      {/* Profile Picture */}
                      <div className="relative group flex-shrink-0">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-xl group-hover:scale-105 transition-transform">
                          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            {/* <User className="w-16 h-16 text-slate-600" aria-hidden="true" /> */}
                            <img src="/static/profile.png" alt="Rohan Joshi" className="h-fullobject-cover" />
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#2C2C2C] flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h1 id="about-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
                          {personalInfo.name}
                        </h1>
                        <p className="text-base lg:text-2xl text-cyan-400 font-semibold mb-6">
                          {personalInfo.title}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm lg:text-base">
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                            <span>{personalInfo.location}</span>
                          </div>
                          <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
                          <div className="flex items-center gap-2 text-slate-300">
                            <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                            <a 
                              href={`mailto:${personalInfo.email}`} 
                              className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline"
                            >
                              {personalInfo.email}
                            </a>
                          </div>
                          <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
                          <div className="flex items-center gap-2 text-emerald-400 font-medium">
                            <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            <span>{personalInfo.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                                              <button 
                        onClick={() => scrollToSection('contact')}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        Get In Touch
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 text-base md:text-md leading-relaxed border-t border-slate-700 pt-8">
                    {personalInfo.summary}
                  </p>
                </div>

                {/* Quick Stats */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {quickStats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={idx}
                        className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all hover:shadow-lg"
                      >
                        <IconComponent className="w-6 h-6 text-cyan-400 mb-3" aria-hidden="true" />
                        <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                      </div>
                    );
                  })}
                </div> */}

                {/* Core Competencies */}
                <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                    <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((area, idx) => {
                      const IconComponent = iconMap[area.icon];
                      return (
                        <div key={idx} className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                          <div className="flex items-center gap-2 mb-4">
                            <IconComponent className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                            <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wide">{area.category}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {area.skills.map((skill, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1.5 bg-slate-700/50 text-slate-200 text-sm font-medium rounded-lg border border-slate-600 hover:border-cyan-500/50 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-700/50" aria-hidden="true" />

            {/* Education Section - Adjustment Layer Effect */}
            <section 
              id="education" 
              ref={el => sectionsRef.current['education'] = el} 
              className="scroll-mt-4"
              style={{ filter: 'brightness(1.03) saturate(1.1)' }}
              aria-labelledby="education-heading"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-7 h-7 text-purple-400" aria-hidden="true" />
                  <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-white">Education</h2>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 shadow-xl border border-slate-700/50 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{edu.degree}</h3>
                            {edu.current && (
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <p className="text-lg md:text-xl text-purple-400 font-semibold mb-2">{edu.school}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" aria-hidden="true" />
                              {edu.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              {edu.period}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-700/50">
                        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" aria-hidden="true" />
                          Key Courses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-purple-500/10 text-purple-300 text-sm font-medium rounded-lg border border-purple-500/30"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <hr className="border-slate-700/50" aria-hidden="true" />

            {/* Experience Section with Timeline - Adjustment Layer Effect */}
            <section 
              id="experience" 
              ref={el => sectionsRef.current['experience'] = el} 
              className="scroll-mt-4"
              style={{ filter: 'brightness(1.04) contrast(1.05)' }}
              aria-labelledby="experience-heading"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-7 h-7 text-blue-400" aria-hidden="true" />
                  <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold text-white">Work Experience</h2>
                </div>
                
                {/* Timeline Visualization */}
                <div className="relative">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent" />

                  <div className="space-y-8">
                    {experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="relative pl-16 md:pl-24"
                      >
                        {/* Timeline Dot with Ping Animation */}
                        <div className="absolute left-6 md:left-8 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-[#242424] shadow-lg z-10">
                          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                        </div>

                        <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 shadow-xl border border-slate-700/50 hover:border-blue-500/30 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                            <div className="flex-1">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                              <p className="text-lg md:text-xl text-blue-400 font-semibold mb-2">{exp.company}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" aria-hidden="true" />
                                  {exp.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" aria-hidden="true" />
                                  {exp.period}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <ul className="space-y-3">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300 leading-relaxed">
                                  <span className="text-cyan-400 mt-0.5 text-lg">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-700/50">
                            {exp.tech.map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-lg border border-blue-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-700/50" aria-hidden="true" />

            {/* Projects Section - Adjustment Layer Effect + Blend Mode */}
            <section 
              id="projects" 
              ref={el => sectionsRef.current['projects'] = el} 
              className="scroll-mt-4"
              style={{ filter: 'brightness(1.05) saturate(1.15)', mixBlendMode: 'normal' }}
              aria-labelledby="projects-heading"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-7 h-7 text-emerald-400" aria-hidden="true" />
                  <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
                </div>
                
                <div className="space-y-6">
                  {projects.map((project, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/30 hover:shadow-xl transition-all group"
                    >
                      <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                      <div className="p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors flex-1">
                            {project.title}
                          </h3>
                          <a 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 group/btn cursor-pointer"
                          >
                            <Github className="w-4 h-4" />
                            <span className="hidden sm:inline">View on GitHub</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                          </a>
                        </div>
                        
                        <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-slate-800/50 text-slate-200 text-sm font-semibold rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <hr className="border-slate-700/50" aria-hidden="true" />

            {/* Gallery Section - Adjustment Layer Effect */}
            <section 
              id="gallery" 
              ref={el => sectionsRef.current['gallery'] = el} 
              className="scroll-mt-4"
              style={{ filter: 'brightness(1.08) contrast(1.1)' }}
              aria-labelledby="gallery-heading"
            >
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Camera className="w-7 h-7 text-purple-400" aria-hidden="true" />
                    <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold text-white">Beyond Code</h2>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
                    I like to capture nature's moments with the same precision I bring to engineering
                  </p>
                </div>
                
                <div className="space-y-6">
                  {galleryPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => openLightbox(photo)}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-slate-800 group cursor-pointer shadow-2xl hover:shadow-purple-500/20 transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                        {/* <div className="text-center">
                          <Camera className="w-20 h-20 text-slate-600 mx-auto mb-4" aria-hidden="true" />
                          <p className="text-slate-500 text-base font-medium">{photo.title}</p>
                          <p className="text-slate-600 text-sm mt-2">Add your image: {photo.src}</p>
                        </div> */}
                        <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                        <div>
                          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{photo.title}</h3>
                          <p className="text-slate-300 text-sm md:text-base">{photo.caption}</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <Search className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20">
                    <Award className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    <p className="text-slate-300 text-sm font-medium">
                      Young Photographer of the Year - International Award Winner
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-700/50" aria-hidden="true" />

            {/* Contact Section */}
            <section 
              id="contact" 
              ref={el => sectionsRef.current['contact'] = el} 
              className="scroll-mt-4"
              aria-labelledby="contact-heading"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-7 h-7 text-orange-400" aria-hidden="true" />
                  <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
                </div>
                
                <p className="text-slate-300 text-base md:text-lg mb-8">
                  I'm actively looking for AI/ML Software Engineering internships for Summer 2026. If you're working on interesting problems in AI systems, distributed architectures, or backend infrastructure, I'd love to chat.
                </p>

                <div className="grid md:grid-cols-2 gap-5">
                  {contactMethods.map((contact, idx) => {
                    const IconComponent = iconMap[contact.icon];
                    return (
                      <a 
                        key={idx}
                        href={contact.href}
                        target={contact.href !== '#' && contact.href.startsWith('http') ? "_blank" : undefined}
                        rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="flex items-center justify-between gap-4 p-6 bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] border border-slate-700/50 rounded-xl hover:border-cyan-500/30 hover:shadow-xl transition-all hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-14 h-14 bg-gradient-to-br ${contact.gradient} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white mb-1 text-base">{contact.label}</div>
                            <div className="text-sm text-slate-400 truncate">{contact.value}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300">
                          <span className="text-xs font-medium hidden sm:inline">{contact.action}</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-cyan-500/20">
                  <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                    {seekingOpportunities.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {seekingOpportunities.areas.map((interest, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-sm font-medium">{interest}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {seekingOpportunities.description}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Right Panels - Desktop only */}
        <aside 
          className="w-64 bg-[#323232] border-l border-black/30 hidden lg:flex flex-col"
          aria-label="Properties sidebar"
        >
          <div className="bg-[#2C2C2C] flex border-b border-black/30" role="tablist">
            {rightPanels.map(panel => (
              <button
                key={panel.id}
                onClick={() => setActiveRightPanel(panel.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                role="tab"
                aria-selected={activeRightPanel === panel.id}
                aria-controls={`${panel.id}-panel`}
                className={`flex-1 px-2 py-3 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 cursor-pointer ${
                  activeRightPanel === panel.id 
                    ? 'bg-[#323232] text-white border-b-2 border-cyan-500' 
                    : 'text-slate-400 hover:text-white hover:bg-[#323232]'
                }`}
              >
                {panel.label}
              </button>
            ))}
          </div>

          {/* P0: History Panel - Actually Works */}
          {activeRightPanel === 'history' && (
            <div className="flex-1 p-3 overflow-auto">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Navigation History</h4>
              <div className="space-y-1">
                {navigationHistory.slice().reverse().map((sectionId, idx) => {
                  const section = sections.find(s => s.id === sectionId);
                  if (!section) return null;
                  const Icon = section.icon;
                  return (
                    <button
                      key={`${sectionId}-${idx}`}
                      onClick={() => scrollToSection(sectionId)}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#3C3C3C] transition-colors text-left cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-300 capitalize flex-1">{sectionId}</span>
                      <span className="text-xs text-slate-500">{navigationHistory.length - idx}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* P0: Color Picker Panel */}
          {activeRightPanel === 'color' && (
            <div className="flex-1 p-4">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-4">Brand Colors</h4>
              <div className="space-y-3">
                {brandColors.map((color, idx) => (
                  <div key={idx} className="bg-[#2C2C2C] rounded-lg p-3 border border-slate-700/50">
                    <div 
                      className="w-full h-12 rounded-lg mb-2 shadow-lg cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    />
                    <div className="text-xs text-slate-300 font-medium mb-1">{color.name}</div>
                    <div className="text-xs text-slate-500">{color.hex}</div>
                    <div className="text-xs text-slate-600">{color.rgb}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layers Panel */}
          {activeRightPanel === 'layers' && (
            <div className="flex-1 flex flex-col">
              <div className="bg-[#2C2C2C] px-3 py-2 border-b border-black/30 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Layers</span>
                <div className="flex gap-1">
                  <button className="text-slate-400 hover:text-white transition-colors" aria-label="Search layers">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-slate-400 hover:text-white transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-2">
                <div className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <div
                        key={section.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer group transition-all duration-200 ${
                          isActive ? 'bg-[#1473E6] shadow-lg' : 'hover:bg-[#3C3C3C]'
                        }`}
                        onClick={() => scrollToSection(section.id)}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        <Eye className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded border border-slate-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-300 truncate font-semibold">{section.label}</div>
                          <div className="text-xs text-slate-500">Normal • RGB/8</div>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">100%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#2C2C2C] px-2 py-3 border-t border-black/30 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Opacity: 100%</span>
              </div>
            </div>
          )}

          {/* Properties Panel */}
          {activeRightPanel === 'properties' && (
            <div className="flex-1 p-4">
              <div className="space-y-3">
                <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Quick Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Role:</span>
                      <span className="text-cyan-400 font-semibold">Software Engineer</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-cyan-400 font-semibold">Graduate Student</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Available:</span>
                      <span className="text-cyan-400 font-semibold">Summer 2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-cyan-400 font-semibold">{personalInfo.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Experience:</span>
                      <span className="text-cyan-400 font-semibold">4+ Years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Current Section</h4>
                  <div className="text-sm text-white font-semibold capitalize">{activeSection}</div>
                </div>

                <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Interests</h4>
                  <div className="space-y-1.5">
                    {['AI/ML Systems', 'Distributed Architecture', 'Wildlife Photography'].map((area, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Bottom Status Bar */}
      <footer className="bg-[#323232] border-t border-black/30 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-medium">{personalInfo.name} - Software Engineer</span>
          <div className="h-3 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
          <span className="capitalize hidden sm:inline">Section: {activeSection}</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span>{personalInfo.email}</span>
          <div className="h-3 w-px bg-slate-600" aria-hidden="true" />
          <span>{personalInfo.location}</span>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
          className="fixed bottom-8 right-8 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-50 cursor-pointer"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" aria-hidden="true" />
        </button>
      )}

      {/* Gallery Lightbox Modal - Enhanced with Keyboard Navigation */}
      {lightboxOpen && lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                {/* <div className="text-center">
                  <Camera className="w-24 h-24 text-slate-600 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-slate-400 text-lg font-medium">{lightboxImage.title}</p>
                </div> */}
                <img src={lightboxImage.src} alt={lightboxImage.title} className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-white text-2xl font-bold mb-2">{lightboxImage.title}</h3>
              <p className="text-slate-400 text-base">{lightboxImage.caption}</p>
              <p className="text-slate-500 text-sm mt-3">
                Click arrows or use <kbd className="px-2 py-1 bg-slate-800 rounded text-cyan-400">←</kbd> <kbd className="px-2 py-1 bg-slate-800 rounded text-cyan-400">→</kbd> keys to navigate
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

);
};

export default Portfolio;