"use client";

import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { education } from '@/data';

interface EducationSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const EducationSection = ({ sectionsRef }: EducationSectionProps) => {
    return (
        <section
            id="education"
            ref={(el) => { sectionsRef.current['education'] = el; }}
            className="scroll-mt-4"
            style={{ filter: 'brightness(1.03) saturate(1.1)' }}
            aria-labelledby="education-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-7 h-7 text-purple-400" aria-hidden="true" />
                    <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-white">Education</h2>
                </div>

                <div className="space-y-6 stagger-children">
                    {education.map((edu, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] rounded-xl p-8 shadow-xl border border-slate-700/50 hover:border-purple-500/30 transition-all card-lift hover-glow-purple"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-white">{edu.degree}</h3>
                                        {edu.current && (
                                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                                                IN PROGRESS
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-base md:text-lg text-purple-400 font-semibold mb-2">{edu.school}</p>
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
    );
};
