"use client";

import { useState, useRef, useEffect } from 'react';
import { Minus, Maximize2, X } from 'lucide-react';
import { personalInfo } from '@/data';

interface TopBarProps {
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const TopBar = ({ scrollToSection, setCursorVariant }: TopBarProps) => {
    const [fileMenuOpen, setFileMenuOpen] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const fileMenuRef = useRef<HTMLDivElement>(null);

    // Close the File dropdown on outside click or Escape.
    useEffect(() => {
        if (!fileMenuOpen) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
                setFileMenuOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setFileMenuOpen(false);
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [fileMenuOpen]);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(personalInfo.email);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 1500);
        } catch {
            // Clipboard may be unavailable (e.g. insecure context); fail silently.
        }
    };

    const fileMenuItemClass =
        "w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-[#3C3C3C] hover:text-white transition-colors focus:outline-none focus:bg-[#3C3C3C] focus:text-white cursor-pointer";

    return (
        <>
            {/* Menu Bar */}
            <div className="bg-[#464646] border-b border-black/30 px-4 py-2 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#31A8FF] to-[#0078D4] rounded flex items-center justify-center text-white font-bold text-xs shadow-lg" aria-hidden="true">
                            Ps
                        </div>
                        <span className="text-slate-300 sm:inline font-medium">Photoshop {new Date().getFullYear()}</span>
                    </div>
                    <nav className="hidden md:flex gap-3 text-slate-300" aria-label="Top menu">
                        <div className="relative" ref={fileMenuRef}>
                            <button
                                onClick={() => setFileMenuOpen(open => !open)}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                aria-haspopup="true"
                                aria-expanded={fileMenuOpen}
                                className={`transition-colors focus:outline-none focus:text-white focus:underline ${fileMenuOpen ? 'text-white' : 'hover:text-white'}`}
                            >
                                File
                            </button>
                            {fileMenuOpen && (
                                <div
                                    role="menu"
                                    aria-label="File menu"
                                    className="absolute left-0 top-full mt-1 w-44 bg-[#2C2C2C] border border-black/30 rounded shadow-xl py-1 z-50 font-mono"
                                >
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        role="menuitem"
                                        onClick={() => setFileMenuOpen(false)}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className={`block ${fileMenuItemClass}`}
                                    >
                                        Download Résumé
                                    </a>
                                    <a
                                        href={personalInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        role="menuitem"
                                        onClick={() => setFileMenuOpen(false)}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className={`block ${fileMenuItemClass}`}
                                    >
                                        View GitHub
                                    </a>
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={handleCopyEmail}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className={fileMenuItemClass}
                                    >
                                        {emailCopied ? 'Copied!' : 'Copy Email'}
                                    </button>
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            scrollToSection('contact');
                                            setFileMenuOpen(false);
                                        }}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className={fileMenuItemClass}
                                    >
                                        Contact
                                    </button>
                                </div>
                            )}
                        </div>
                        {['Edit', 'Image', 'Layer', 'Type', 'Select', 'Filter', 'View', 'Window', 'Help'].map(menu => (
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
