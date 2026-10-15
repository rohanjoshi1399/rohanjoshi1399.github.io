"use client";

import { Code, Github, ExternalLink, Globe } from 'lucide-react';
import { projects, moreProjects } from '@/data';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';

interface ProjectsSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const linkButtonClass =
    "flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#3C3C3C] hover:bg-[#4A4A4A] border border-[#555555] text-white text-sm rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent group/btn cursor-pointer";

export const ProjectsSection = ({ sectionsRef, setCursorVariant }: ProjectsSectionProps) => {
    const hoverProps = {
        onMouseEnter: () => setCursorVariant('hover'),
        onMouseLeave: () => setCursorVariant('default'),
    };

    return (
        <section
            id="projects"
            ref={(el) => { sectionsRef.current['projects'] = el; }}
            className="scroll-mt-4"
            aria-labelledby="projects-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <Code className="w-7 h-7 text-ps-accent" aria-hidden="true" />
                    <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold text-white font-mono">Featured Projects</h2>
                </div>

                <div className="space-y-8">
                    {projects.map((project) => (
                        <article
                            key={project.title}
                            className="bg-ps-card border border-slate-700/50 rounded-xl"
                        >
                            <div className="p-6 md:p-10 space-y-6">
                                {/* Header */}
                                <div className="flex flex-row items-start justify-between gap-4">
                                    <div className="flex-1 flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl md:text-2xl font-bold text-white text-balance">
                                            {project.title}
                                        </h3>
                                        {project.status && <Tag variant="status">{project.status}</Tag>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                {...hoverProps}
                                                className={linkButtonClass}
                                                aria-label={`Open the live ${project.title} demo`}
                                            >
                                                <Globe className="w-4 h-4" aria-hidden="true" />
                                                <span className="hidden sm:inline">Live Demo</span>
                                            </a>
                                        )}
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...hoverProps}
                                            className={linkButtonClass}
                                            aria-label={`View ${project.title} source code on GitHub`}
                                        >
                                            <Github className="w-4 h-4" aria-hidden="true" />
                                            <span className="hidden sm:inline">View on GitHub</span>
                                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity hidden sm:block" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>

                                {/* The Problem */}
                                <div>
                                    <Label className="mb-2">The Problem</Label>
                                    <p className="text-slate-300 text-base leading-relaxed max-w-[75ch]">
                                        {project.problem}
                                    </p>
                                </div>

                                {/* What I Built */}
                                <div>
                                    <Label className="mb-2">What I Built</Label>
                                    <p className="text-slate-300 text-base leading-relaxed max-w-[75ch]">
                                        {project.solution}
                                    </p>
                                </div>

                                {/* How It Works */}
                                <div>
                                    <Label className="mb-3">{project.impactLabel ?? "How It Works"}</Label>
                                    <ul className="list-disc pl-5 space-y-2 marker:text-ps-accent">
                                        {project.impact.map((item) => (
                                            <li key={item} className="text-base text-slate-300 leading-relaxed max-w-[75ch]">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* The Results */}
                                <div>
                                    <Label className="mb-2">{project.highlightLabel ?? "The Results"}</Label>
                                    <p className="text-slate-100 text-base leading-relaxed max-w-[75ch]">
                                        {project.highlight}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-700/50">
                                    {project.tech.map((tech) => (
                                        <Tag key={tech}>{tech}</Tag>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* More Work: compact rows, hidden until there's something to show */}
                {moreProjects.length > 0 && (
                    <div className="pt-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-4">More Work</h3>
                        <ul className="bg-ps-card border border-slate-700/50 rounded-xl divide-y divide-slate-700/50">
                            {moreProjects.map((project) => (
                                <li key={project.title} className="p-5 md:p-6 flex flex-col md:flex-row md:items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h4 className="text-lg font-bold text-white">{project.title}</h4>
                                            {project.status && <Tag variant="status">{project.status}</Tag>}
                                        </div>
                                        <p className="text-slate-300 text-base leading-relaxed mb-3 max-w-[75ch]">
                                            {project.summary}
                                        </p>
                                        <p className="text-sm text-slate-400">{project.tech.join(' · ')}</p>
                                    </div>
                                    <div className="flex items-center gap-2 md:pt-1">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                {...hoverProps}
                                                className={linkButtonClass}
                                                aria-label={`Open the live ${project.title} demo`}
                                            >
                                                <Globe className="w-4 h-4" aria-hidden="true" />
                                                <span>Live</span>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                {...hoverProps}
                                                className={linkButtonClass}
                                                aria-label={`View ${project.title} source code on GitHub`}
                                            >
                                                <Github className="w-4 h-4" aria-hidden="true" />
                                                <span>Code</span>
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};
