"use client";

import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { experience } from '@/data';

interface ExperienceSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const ExperienceSection = ({ sectionsRef }: ExperienceSectionProps) => {
    return (
        <section
            id="experience"
            ref={(el) => { sectionsRef.current['experience'] = el; }}
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

                    <div className="space-y-8 stagger-children">
                        {experience.map((exp, idx) => (
                            <div
                                key={idx}
                                className="relative pl-16 md:pl-24"
                            >
                                {/* Timeline Dot with Ping Animation */}
                                <div className="absolute left-6 md:left-8 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-[#242424] shadow-lg z-10">
                                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                                </div>

                                <div className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 shadow-xl border border-slate-700/50 hover:border-blue-500/30 transition-all card-lift hover-glow">
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{exp.title}</h3>
                                            <p className="text-base md:text-lg text-blue-400 font-semibold mb-2">{exp.company}</p>
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

                                    {/* Structured Content for Software Engineer II */}
                                    {exp.challenge && (
                                        <div className="space-y-6 mb-6">
                                            {/* The Challenge */}
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-400 mb-2">The Challenge</h4>
                                                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                    {exp.challenge}
                                                </p>
                                            </div>

                                            {/* What I Built */}
                                            <div>
                                                <h4 className="text-lg font-semibold text-emerald-400 mb-2">What I Built</h4>
                                                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                    {exp.solution}
                                                </p>
                                            </div>

                                            {/* The Impact */}
                                            {exp.impact.length > 0 && (
                                                <div>
                                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">The Impact</h4>
                                                    <ul className="space-y-2">
                                                        {exp.impact.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300">
                                                                <span className="text-cyan-400 mt-0.5">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* The Technical Part */}
                                            {exp.technical && (
                                                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                                                    <h4 className="text-base font-semibold text-cyan-400 mb-2">The Tricky Bit</h4>
                                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                        {exp.technical}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Key Projects/Achievements */}
                                    <div className="mb-6">
                                        <h4 className="text-base font-semibold text-slate-400 mb-3">
                                            {exp.challenge ? "Key Projects" : "Key Achievements"}
                                        </h4>
                                        <ul className="space-y-3">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300 leading-relaxed">
                                                    <span className="text-cyan-400 mt-0.5 text-lg">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
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
    );
};