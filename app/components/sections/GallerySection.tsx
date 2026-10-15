"use client";

import { Camera, Award, ExternalLink, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/portfolio';

interface GallerySectionProps {
    sectionsRef: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    galleryPhotos: GalleryPhoto[];
    openLightbox: (photo: GalleryPhoto) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

const linkTileClass =
    "group inline-flex items-center gap-3 px-5 py-3 bg-ps-card rounded-lg border border-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-accent";

const awards = [
    {
        href: "https://www.natureinfocus.in/awards/#gallery",
        title: "NatureInFocus 2015",
        detail: "Young Photographer, Winner"
    },
    {
        href: "https://naturephotographeroftheyear.com/previous-editions/npoty-2016-results/",
        title: "NPOTY 2016",
        detail: "Category Youth, Winner"
    }
];

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
            aria-labelledby="gallery-heading"
        >
            <div className="space-y-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Camera className="w-7 h-7 text-ps-accent" aria-hidden="true" />
                        <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold text-white font-mono">Wildlife Photography</h2>
                    </div>

                    {/* Personal Story */}
                    <p className="max-w-[65ch] mx-auto text-slate-300 text-base leading-relaxed">
                        Growing up, our family would often venture into wildlife sanctuaries and national parks across India.
                        Wildlife photography has always been my father&apos;s passion, and watching him patiently wait for
                        the perfect shot sparked something in me. Over the years, what started as tagging along on his adventures
                        has blossomed into a shared love for capturing the raw beauty of nature.
                    </p>
                </div>

                <div className="space-y-6">
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
                            aria-label={`View ${photo.title} in full screen`}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-slate-800 group cursor-zoom-in border border-slate-700/50 hover:border-slate-500 transition-colors"
                        >
                            <Image
                                src={photo.src}
                                alt={`${photo.caption}, ${photo.location}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />

                            {/* Caption: on hover/focus with a mouse, always visible on touch */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100 transition-opacity duration-300 flex items-end p-5 md:p-8">
                                <div>
                                    <h3 className="text-white text-lg md:text-2xl font-bold mb-1">{photo.title}</h3>
                                    <p className="text-slate-200 text-sm md:text-base">{photo.caption}</p>
                                    <p className="text-slate-300 text-xs md:text-sm font-mono mt-1">{photo.location}</p>
                                </div>
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
                        className={linkTileClass}
                    >
                        <Instagram className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        <span className="text-slate-200 font-medium text-sm">Follow on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors" aria-hidden="true" />
                    </a>
                    <a
                        href="https://www.youtube.com/@rohanjoshi5604"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkTileClass}
                    >
                        <Youtube className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        <span className="text-slate-200 font-medium text-sm">Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors" aria-hidden="true" />
                    </a>
                </div>

                {/* Awards Section */}
                <div className="text-center pt-4 space-y-4">
                    <h3 className="text-base md:text-lg font-semibold text-slate-300 mb-4 flex items-center justify-center gap-2">
                        <Award className="w-5 h-5 text-ps-accent" aria-hidden="true" />
                        Photography Awards
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {awards.map((award) => (
                            <a
                                key={award.title}
                                href={award.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkTileClass} py-4`}
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-white font-bold text-sm">{award.title}</span>
                                    <span className="text-slate-400 text-xs">{award.detail}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
