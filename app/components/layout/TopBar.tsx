"use client";

import { Minus, Maximize2, X, Download } from 'lucide-react';

interface TopBarProps {
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const TopBar = ({ scrollToSection, setCursorVariant }: TopBarProps) => {
    return (
        <>
            {/* Menu Bar */}
            <div className="bg-[#464646] border-b border-black/30 px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#31A8FF] to-[#0078D4] rounded flex items-center justify-center text-white font-bold text-xs shadow-lg" aria-hidden="true">
                            Ps
                        </div>
                        <span className="text-slate-300 sm:inline font-medium">Photoshop {new Date().getFullYear()}</span>
                    </div>
                    <nav className="hidden md:flex gap-3 text-slate-300" aria-label="Top menu">
                        {['File', 'Edit', 'Image', 'Layer', 'Type', 'Select', 'Filter', 'View', 'Window', 'Help'].map(menu => (
                            <button key={menu} className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline">{menu}</button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-white hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded" aria-label="Minimize">
                        <Minus className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-white hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded" aria-label="Maximize">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-red-400 hidden md:block transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded" aria-label="Close">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    );
};
