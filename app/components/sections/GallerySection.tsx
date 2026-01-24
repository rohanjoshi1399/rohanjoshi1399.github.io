"use client";

import { Camera, Search, Award, ExternalLink, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/portfolio';

interface GallerySectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    galleryPhotos: GalleryPhoto[];
    openLightbox: (photo: GalleryPhoto) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const GallerySection = ({
    sectionsRef,
    galleryPhotos,
    openLightbox,
    setCursorVariant
}: GallerySectionProps) => {
    return (
        <section
            id="gallery"
            ref={(el) => { sectionsRef.current['gallery'] = el; }}
            className="scroll-mt-4"
            style={{ filter: 'brightness(1.08) contrast(1.1)' }}
            aria-labelledby="gallery-heading"
        >
            <div className="space-y-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Camera className="w-7 h-7 text-purple-400" aria-hidden="true" />
                        <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold text-white">Beyond Code</h2>
                    </div>

                    {/* Personal Story */}
                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-6 border border-purple-500/10">
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed italic">
                            Growing up, our family would often venture into wildlife sanctuaries and national parks across India.
                            Wildlife photography has always been my father&apos;s passion, and watching him patiently wait for
                            the perfect shot sparked something in me. Over the years, what started as tagging along on his adventures
                            has blossomed into a shared love for capturing the raw beauty of nature.
                        </p>
                    </div>
                </div>

                <div className="space-y-6 stagger-children">
                    {galleryPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => openLightbox(photo)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openLightbox(photo);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`View ${photo.title} in lightbox`}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="gallery-item relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-slate-800 group cursor-pointer shadow-2xl hover:shadow-purple-500/20 focus-visible:shadow-purple-500/30 transition-all card-lift hover-glow-purple"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500 flex items-end p-8">
                                <div>
                                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{photo.title}</h3>
                                    <p className="text-slate-300 text-sm md:text-base">{photo.caption}</p>
                                </div>
                            </div>

                            <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 group-hover:scale-110">
                                <Search className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a
                        href="https://www.instagram.com/rohki_pics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-105"
                    >
                        <Instagram className="w-5 h-5 text-pink-400" />
                        <span className="text-slate-300 font-medium text-sm">Follow on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5 text-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                        href="https://www.youtube.com/@rohanjoshi5604"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105"
                    >
                        <Youtube className="w-5 h-5 text-red-400" />
                        <span className="text-slate-300 font-medium text-sm">Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 text-red-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>

                {/* Awards Section */}
                <div className="text-center pt-4 space-y-4">
                    <h3 className="text-base md:text-lg font-semibold text-slate-300 mb-4 flex items-center justify-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" aria-hidden="true" />
                        Photography Awards
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://www.natureinfocus.in/wildlife-photography-contests/winners/2015/learn-to-be-still"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-purple-300 font-bold text-sm">NatureInFocus 2015</span>
                                <span className="text-slate-400 text-xs">Young Photographer — Winner</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a
                            href="https://naturephotographeroftheyear.com/previous-editions/npoty-2016-results/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 hover:border-amber-500/50 transition-all hover:scale-105"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-amber-300 font-bold text-sm">NPOTY 2016</span>
                                <span className="text-slate-400 text-xs">Category Youth — Winner</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-amber-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
