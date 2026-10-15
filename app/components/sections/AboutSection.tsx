"use client";

import { Code, Cloud, Database, Zap, MapPin, Mail, FileText } from 'lucide-react';
import Image from 'next/image';
import { personalInfo, skillCategories } from '@/data';
import { SkillCategory } from '@/types/portfolio';
import { AvailabilityChip } from '../ui/AvailabilityChip';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';

interface AboutSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const iconMap: Record<SkillCategory['icon'], React.ComponentType<{ className?: string }>> = {
    'zap': Zap,
    'code': Code,
    'cloud': Cloud,
    'database': Database
};

export const AboutSection = ({ sectionsRef, setCursorVariant }: AboutSectionProps) => {
    return (
        <section
            id="about"
            ref={(el) => { sectionsRef.current['about'] = el; }}
            className="scroll-mt-4"
            aria-labelledby="about-heading"
        >
            <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-ps-card p-6 sm:p-8 md:p-10 border border-slate-700/50 rounded-xl">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                            {/* Profile Picture */}
                            <div className="flex-shrink-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-slate-600 p-1">
                                <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden">
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

                            <div className="flex-1 text-center sm:text-left">
                                <h1 id="about-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
                                    {personalInfo.name}
                                </h1>
                                <p className="text-lg md:text-xl text-ps-accent font-semibold mb-3 text-balance">
                                    {personalInfo.title}
                                </p>
                                <p className="text-base md:text-lg text-slate-400 mb-6 max-w-xl">
                                    I love building new things; these days that&apos;s AI systems: RAG, multi-agent architectures and distributed backends.
                                </p>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 text-sm lg:text-base">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                                        <span>{personalInfo.location}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                                        <a
                                            href={`mailto:${personalInfo.email}`}
                                            className="inline-flex items-center hover:text-ps-accent transition-colors focus:outline-none focus:underline break-all"
                                        >
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                    <AvailabilityChip text={personalInfo.availability} className="w-fit" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[200px]">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-ps-blue hover:bg-ps-blue-hover text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ps-card"
                            >
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                Email Me
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-[#555555] bg-[#333333] hover:bg-[#404040] hover:border-[#666666] text-slate-100 font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent"
                            >
                                <FileText className="w-4 h-4" aria-hidden="true" />
                                Résumé
                            </a>
                        </div>
                    </div>

                    <p className="text-slate-300 text-base md:text-lg leading-relaxed border-t border-slate-700 pt-8 max-w-[70ch]">
                        {personalInfo.summary}
                    </p>
                </div>

                {/* Core Competencies */}
                <div className="bg-ps-card rounded-xl p-6 sm:p-8 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-6">
                        <Code className="w-6 h-6 text-ps-accent" aria-hidden="true" />
                        <h2 className="text-xl md:text-2xl font-bold text-white font-mono">Technical Skills</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                        {skillCategories.map((area) => {
                            const IconComponent = iconMap[area.icon];
                            return (
                                <div key={area.category}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <IconComponent className="w-4 h-4 text-ps-accent" aria-hidden="true" />
                                        <Label as="h3" variant="caps">{area.category}</Label>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {area.skills.map((skill) => (
                                            <Tag key={skill}>{skill}</Tag>
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
