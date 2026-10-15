"use client";

import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/portfolio';

interface LightboxProps {
    lightboxImage: GalleryPhoto;
    index: number;
    total: number;
    onClose: () => void;
    onNavigate: (direction: 'next' | 'prev') => void;
}

const controlClass =
    "absolute z-10 w-11 h-11 bg-[#2A2A2A] hover:bg-[#3C3C3C] border border-white/10 rounded-md flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent";

export const Lightbox = ({ lightboxImage, index, total, onClose, onNavigate }: LightboxProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    // Move focus into the dialog on open, keep Tab inside it, and hand focus
    // back to whatever opened it (the gallery tile) on close.
    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !dialogRef.current) return;
            const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus();
        };
    }, []);

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxImage.title}, photo ${index + 1} of ${total}`}
            className="lightbox-backdrop fixed inset-0 bg-[#1E1E1E] z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                ref={closeRef}
                onClick={onClose}
                className={`${controlClass} top-4 right-4 md:top-6 md:right-6`}
                aria-label="Close full screen view"
            >
                <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('prev');
                }}
                className={`${controlClass} left-4 bottom-6 md:left-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}
                aria-label="Previous photo"
            >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('next');
                }}
                className={`${controlClass} right-4 bottom-6 md:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}
                aria-label="Next photo"
            >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="lightbox-content max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-md overflow-hidden bg-[#1E1E1E]">
                    <Image
                        src={lightboxImage.src}
                        alt={`${lightboxImage.caption}, ${lightboxImage.location}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                    />
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                    <p className="text-slate-300 text-base">{lightboxImage.caption}</p>
                    <p className="text-slate-400 text-sm font-mono mt-1">{lightboxImage.location}</p>
                    <p className="text-slate-400 text-xs font-mono mt-4">
                        {index + 1} / {total}
                        <span className="hidden pointer-fine:inline">
                            {' '}· Use <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] border border-white/10 rounded text-slate-200">←</kbd> <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] border border-white/10 rounded text-slate-200">→</kbd> to browse, <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] border border-white/10 rounded text-slate-200">Esc</kbd> to close
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
