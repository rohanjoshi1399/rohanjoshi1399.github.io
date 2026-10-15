"use client";

import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { experience } from '@/data';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';

interface ExperienceSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const ExperienceSection = ({ sectionsRef }: ExperienceSectionProps) => {
    return (
        <section
            id="experience"
            ref={(el) => { sectionsRef.current['experience'] = el; }}
            className="scroll-mt-4"
            aria-labelledby="experience-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-7 h-7 text-ps-accent" aria-hidden="true" />
                    <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold text-white font-mono">Work Experience</h2>
                </div>

                {/* Timeline Visualization */}
                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-3 md:left-12 top-0 bottom-0 w-px bg-slate-700" aria-hidden="true" />

                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div
                                key={`${exp.company}-${exp.title}`}
                                className="relative pl-9 md:pl-24"
                            >
                                {/* Timeline Dot */}
                                <div
                                    className="absolute left-3 md:left-12 top-8 w-5 h-5 -translate-x-1/2 rounded-full bg-ps-blue border-4 border-[#242424] z-10"
                                    aria-hidden="true"
                                />

                                <div className="bg-ps-card rounded-xl p-6 md:p-8 border border-slate-700/50">
                                    {/* Header */}
                                    <div className="mb-5">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-balance">{exp.title}</h3>
                                        <p className="text-base md:text-lg text-ps-accent font-semibold mb-2">{exp.company}</p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
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

                                    <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-[70ch]">
                                        {exp.solution}
                                    </p>

                                    <div className="mb-6">
                                        <Label className="mb-3">Highlights</Label>
                                        <ul className="list-disc pl-5 space-y-3 marker:text-ps-accent">
                                            {exp.achievements.map((achievement) => (
                                                <li key={achievement} className="text-base text-slate-300 leading-relaxed max-w-[75ch]">
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {exp.link && (
                                        <a
                                            href={exp.link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-ps-accent hover:text-white transition-colors focus:outline-none focus-visible:underline"
                                        >
                                            {exp.link.label}
                                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                        </a>
                                    )}

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-700/50">
                                        {exp.tech.map((tech) => (
                                            <Tag key={tech}>{tech}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
