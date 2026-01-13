"use client";

import { Mail, Briefcase, ExternalLink } from 'lucide-react';
import { contactMethods, seekingOpportunities } from '@/data';

interface ContactSectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'zap': require('lucide-react').Zap,
    'code': require('lucide-react').Code,
    'cloud': require('lucide-react').Cloud,
    'git-branch': require('lucide-react').GitBranch,
    'mail': Mail,
    'github': require('lucide-react').Github,
    'linkedin': require('lucide-react').Linkedin,
    'file-text': require('lucide-react').FileText
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
                    <Mail className="w-7 h-7 text-orange-400" aria-hidden="true" />
                    <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
                </div>

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
                                        <div className="font-bold text-white mb-1 text-sm md:text-base">{contact.label}</div>
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
                    <h3 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
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
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        {seekingOpportunities.description}
                    </p>
                </div>
            </div>
        </section>
    );
};
