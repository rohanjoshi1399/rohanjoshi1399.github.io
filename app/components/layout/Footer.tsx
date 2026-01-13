"use client";

import { personalInfo } from '@/data';

interface FooterProps {
    activeSection: string;
}

export const Footer = ({ activeSection }: FooterProps) => {
    return (
        <footer className="bg-[#323232] border-t border-black/30 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
                <span className="text-slate-300 font-medium">{personalInfo.name} - Software Engineer</span>
                <div className="h-3 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
                <span className="capitalize hidden sm:inline">Section: {activeSection}</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
                <span>{personalInfo.email}</span>
                <div className="h-3 w-px bg-slate-600" aria-hidden="true" />
                <span>{personalInfo.location}</span>
            </div>
        </footer>
    );
};
