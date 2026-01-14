"use client";

import { Download } from 'lucide-react';
import { personalInfo } from '@/data';

interface OptionsBarProps {
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const OptionsBar = ({ scrollToSection, setCursorVariant }: OptionsBarProps) => {
    return (
        <div className="bg-[#3C3C3C] border-b border-black/20 px-4 py-2.5 flex items-center gap-3 text-sm overflow-x-auto">
            <div className="flex items-center gap-2">
                <label htmlFor="layer-select" className="text-slate-400 text-xs">Select:</label>
                <select id="layer-select" className="bg-[#2C2C2C] text-slate-300 px-2 py-1 rounded text-xs border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option>Active Layers</option>
                </select>
            </div>
            <div className="h-4 w-px bg-slate-600" aria-hidden="true" />
            <span className="text-slate-300 whitespace-nowrap font-medium">{personalInfo.name}</span>
            <div className="h-4 w-px bg-slate-600 hidden sm:block" aria-hidden="true" />
            <span className="text-slate-400 whitespace-nowrap hidden sm:inline text-xs">M.S. Computer Science @ Northeastern</span>
            <div className="ml-auto flex items-center gap-3">
                {/* <a
                    href="#"
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs font-medium cursor-pointer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Resume</span>
                </a> */}
                <button
                    onClick={() => scrollToSection('contact')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="hidden sm:block px-5 py-2 bg-[#1473E6] hover:bg-[#0D66D0] text-white rounded-lg text-xs font-semibold transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                >
                    Contact Me
                </button>
            </div>
        </div>
    );
};
