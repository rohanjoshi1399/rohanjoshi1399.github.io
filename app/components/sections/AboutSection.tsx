"use client";

import { Code, MapPin, Mail, Calendar } from 'lucide-react';
import Image from 'next/image';
import { personalInfo, skillCategories } from '@/data';

interface AboutSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'zap': require('lucide-react').Zap,
    'code': Code,
    'cloud': require('lucide-react').Cloud,
    'git-branch': require('lucide-react').GitBranch,
    'mail': Mail,
    'github': require('lucide-react').Github,
    'linkedin': require('lucide-react').Linkedin,
    'file-text': require('lucide-react').FileText
};

export const AboutSection = ({ sectionsRef, scrollToSection, setCursorVariant }: AboutSectionProps) => {
    return (
        <section
            id="about"
            ref={(el) => { sectionsRef.current['about'] = el; }}
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
                                        <Image
                                            src="/static/profile.jpg"
                                            alt="Rohan Joshi"
                                            width={192}
                                            height={192}
                                            priority
                                            className="h-full w-full object-cover"
                                        />
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
                                <p className="text-lg md:text-xl text-cyan-400 font-semibold mb-6">
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
                                            className="inline-flex items-center hover:text-cyan-400 transition-colors focus:outline-none focus:underline break-all"
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

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-700 pt-8">
                        {personalInfo.summary}
                    </p>
                </div>

                {/* Core Competencies */}
                <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-6">
                        <Code className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                        <h2 className="text-xl md:text-2xl font-bold text-white">Technical Skills</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {skillCategories.map((area, idx) => {
                            const IconComponent = iconMap[area.icon];
                            return (
                                <div key={idx} className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconComponent className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">{area.category}</h3>
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
    );
};
