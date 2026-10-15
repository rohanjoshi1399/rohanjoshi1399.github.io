"use client";

import { Mail, Briefcase, ExternalLink, ArrowRight, Github, Linkedin, FileText } from 'lucide-react';
import { contactMethods, personalInfo, seekingOpportunities } from '@/data';
import { ContactMethod } from '@/types/portfolio';
import { AvailabilityChip } from '../ui/AvailabilityChip';

interface ContactSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const iconMap: Record<ContactMethod['icon'], React.ComponentType<{ className?: string }>> = {
    'mail': Mail,
    'github': Github,
    'linkedin': Linkedin,
    'file-text': FileText
};

export const ContactSection = ({ sectionsRef, setCursorVariant }: ContactSectionProps) => {
    return (
        <section
            id="contact"
            ref={(el) => { sectionsRef.current['contact'] = el; }}
            className="scroll-mt-4"
            aria-labelledby="contact-heading"
        >
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-7 h-7 text-ps-accent" aria-hidden="true" />
                    <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-white font-mono">Get In Touch</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {contactMethods.map((contact) => {
                        const IconComponent = iconMap[contact.icon];
                        const isExternal = !contact.href.startsWith('mailto:');
                        const TrailingIcon = isExternal ? ExternalLink : ArrowRight;
                        return (
                            <a
                                key={contact.label}
                                href={contact.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="flex items-center justify-between gap-4 p-5 md:p-6 bg-ps-card border border-slate-700/50 rounded-xl hover:border-slate-500 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent cursor-pointer"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 bg-[#3C3C3C] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-6 h-6 text-slate-200" aria-hidden="true" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-white mb-1 text-sm md:text-base">{contact.label}</div>
                                        <div className="text-sm text-slate-400 truncate">{contact.value}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-ps-accent group-hover:text-white transition-colors">
                                    <span className="text-xs font-medium hidden sm:inline">{contact.action}</span>
                                    <TrailingIcon className="w-4 h-4" aria-hidden="true" />
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="bg-ps-card rounded-xl p-6 md:p-8 border border-slate-700/50">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <h3 className="font-bold text-white text-lg md:text-xl flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-ps-accent" aria-hidden="true" />
                            {seekingOpportunities.title}
                        </h3>
                        <AvailabilityChip text={personalInfo.availability} />
                    </div>
                    <ul className="grid md:grid-cols-3 gap-3 mb-6">
                        {seekingOpportunities.areas.map((interest) => (
                            <li key={interest} className="flex items-center gap-2 text-slate-200">
                                <span className="w-1.5 h-1.5 bg-ps-accent rounded-full flex-shrink-0" aria-hidden="true" />
                                <span className="text-sm font-medium">{interest}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-slate-300 text-base leading-relaxed max-w-[70ch]">
                        {seekingOpportunities.description}
                    </p>
                </div>
            </div>
        </section>
    );
};
