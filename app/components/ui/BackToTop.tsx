"use client";

import { ChevronUp } from 'lucide-react';

interface BackToTopProps {
    show: boolean;
    onClick: () => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const BackToTop = ({ show, onClick, setCursorVariant }: BackToTopProps) => {
    if (!show) return null;

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="fixed bottom-24 right-4 md:bottom-12 md:right-[15.5rem] lg:right-[17.5rem] p-2.5 bg-[#3C3C3C] hover:bg-[#4A4A4A] text-slate-100 border border-black/40 rounded-md shadow-lg shadow-black/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent z-30 cursor-pointer"
            aria-label="Back to top"
        >
            <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>
    );
};
