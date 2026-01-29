"use client";

import { Code, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data';

interface ProjectsSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const ProjectsSection = ({ sectionsRef, setCursorVariant }: ProjectsSectionProps) => {
    return (
        <section
            id="projects"
            ref={(el) => { sectionsRef.current['projects'] = el; }}
            className="scroll-mt-4"
            style={{ filter: 'brightness(1.05) saturate(1.15)', mixBlendMode: 'normal' }}
            aria-labelledby="projects-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <Code className="w-7 h-7 text-emerald-400" aria-hidden="true" />
                    <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
                </div>

                <div className="space-y-8 stagger-children">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all group card-lift hover-glow-emerald"
                        >
                            <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                            <div className="p-8 md:p-10 space-y-6">
                                {/* Header */}
                                <div className="flex flex-row items-start justify-between gap-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors flex-1">
                                        {project.title}
                                    </h3>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className="spring-button flex-shrink-0 flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 group/btn cursor-pointer"
                                        aria-label={`View ${project.title} source code on GitHub`}
                                    >
                                        <Github className="w-4 h-4" aria-hidden="true" />
                                        <span className="hidden sm:inline">View on GitHub</span>
                                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity hidden sm:block" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* The Problem */}
                                <div>
                                    <h4 className="text-lg font-semibold text-emerald-400 mb-2">The Problem</h4>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        {project.problem}
                                    </p>
                                </div>

                                {/* What I Built */}
                                <div>
                                    <h4 className="text-lg font-semibold text-blue-400 mb-2">What I Built</h4>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>

                                {/* Who It Helps / Where It Matters */}
                                <div>
                                    <h4 className="text-lg font-semibold text-purple-400 mb-3">
                                        {project.title.includes("Chorus") ? "Who It Helps" : "Where It Matters"}
                                    </h4>
                                    <ul className="space-y-2">
                                        {project.impact.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-300">
                                                <span className="text-cyan-400 mt-0.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* The Cool Part / The Numbers */}
                                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                                    <h4 className="text-base font-semibold text-cyan-400 mb-2">
                                        {project.title.includes("Chorus") ? "The Cool Part" : "The Numbers"}
                                    </h4>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        {project.highlight}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
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
    );
};