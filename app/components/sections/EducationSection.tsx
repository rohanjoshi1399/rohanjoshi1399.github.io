"use client";

import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { education } from '@/data';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';

interface EducationSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const EducationSection = ({ sectionsRef }: EducationSectionProps) => {
    return (
        <section
            id="education"
            ref={(el) => { sectionsRef.current['education'] = el; }}
            className="scroll-mt-4"
            aria-labelledby="education-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-7 h-7 text-ps-accent" aria-hidden="true" />
                    <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-white font-mono">Education</h2>
                </div>

                <div className="space-y-6">
                    {education.map((edu) => (
                        <div
                            key={edu.school}
                            className="bg-ps-card rounded-xl p-6 md:p-8 border border-slate-700/50"
                        >
                            <div className="mb-6">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-white">{edu.degree}</h3>
                                    {edu.gpa && <Tag variant="status">{edu.gpa}</Tag>}
                                </div>
                                <p className="text-base md:text-lg text-ps-accent font-semibold mb-2">{edu.school}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
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

                            <div className="pt-6 border-t border-slate-700/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <BookOpen className="w-4 h-4 text-ps-accent" aria-hidden="true" />
                                    <Label variant="caps">Key Courses</Label>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {edu.courses.map((course) => (
                                        <Tag key={course}>{course}</Tag>
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
