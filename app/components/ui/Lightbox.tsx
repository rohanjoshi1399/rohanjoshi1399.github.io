"use client";

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/portfolio';

interface LightboxProps {
    lightboxImage: GalleryPhoto;
    onClose: () => void;
    onNavigate: (direction: 'next' | 'prev') => void;
}

export const Lightbox = ({ lightboxImage, onClose, onNavigate }: LightboxProps) => {
    return (
        <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('prev');
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('next');
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                aria-label="Next image"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                        <Image
                            src={lightboxImage.src}
                            alt={lightboxImage.title}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            quality={90}
                        />
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                    <p className="text-slate-400 text-base">{lightboxImage.caption}</p>
                    <p className="text-slate-500 text-sm mt-3">
                        Click arrows or use <kbd className="px-2 py-1 bg-slate-800 rounded text-cyan-400">←</kbd> <kbd className="px-2 py-1 bg-slate-800 rounded text-cyan-400">→</kbd> keys to navigate
                    </p>
                </div>
            </div>
        </div>
    );
};
