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
            className="fixed bottom-8 right-8 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-50 cursor-pointer"
            aria-label="Back to top"
        >
            <ChevronUp className="w-6 h-6" aria-hidden="true" />
        </button>
    );
};
