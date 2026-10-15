"use client";

import { FileText, Mail } from 'lucide-react';
import { personalInfo } from '@/data';
import { AvailabilityChip } from '../ui/AvailabilityChip';

interface OptionsBarProps {
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const OptionsBar = ({ scrollToSection, setCursorVariant }: OptionsBarProps) => {
    return (
        <div className="bg-[#3C3C3C] border-b border-black/20 px-4 py-2.5 flex items-center gap-3 text-sm overflow-x-auto font-mono">
            <div className="hidden lg:flex items-center gap-2">
                <label htmlFor="layer-select" className="text-slate-300 text-xs">Select:</label>
                <select id="layer-select" className="bg-[#2C2C2C] text-slate-300 px-2 py-1 rounded text-xs border border-slate-600 focus:outline-none focus:ring-2 focus:ring-ps-accent">
                    <option>Active Layers</option>
                </select>
            </div>
            <div className="h-4 w-px bg-slate-600 hidden lg:block" aria-hidden="true" />
            <span className="text-slate-300 whitespace-nowrap font-medium hidden sm:inline">{personalInfo.name}</span>
            <div className="h-4 w-px bg-slate-600 hidden xl:block" aria-hidden="true" />
            <span className="text-slate-300 whitespace-nowrap hidden xl:inline text-xs">M.S. Computer Science @ Northeastern</span>
            <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
            {/* Availability: full line from sm up, compact on phones */}
            <span className="hidden sm:contents">
                <AvailabilityChip text={personalInfo.availability} />
            </span>
            <span className="contents sm:hidden">
                <AvailabilityChip text={personalInfo.availabilityShort} />
            </span>
            <div className="ml-auto flex items-center gap-3">
                <button
                    onClick={() => scrollToSection('contact')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-ps-blue hover:bg-ps-blue-hover text-white rounded-lg text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent cursor-pointer"
                >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span className="max-[379px]:sr-only">Contact</span>
                </button>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#2C2C2C] hover:bg-[#4A4A4A] text-slate-100 rounded-lg border border-[#555555] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent text-xs font-medium cursor-pointer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Résumé</span>
                </a>
                <button
                    onClick={() => scrollToSection('contact')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="hidden md:block px-5 py-2 bg-ps-blue hover:bg-ps-blue-hover text-white rounded-lg text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent cursor-pointer"
                >
                    Contact
                </button>
            </div>
        </div>
    );
};
