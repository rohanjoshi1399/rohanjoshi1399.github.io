"use client";

import { Layers } from 'lucide-react';

interface Section {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface MobileToolBarProps {
    sections: Section[];
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
    onOpenLayers: () => void;
}

export const MobileToolBar = ({
    sections,
    activeSection,
    scrollToSection,
    onOpenLayers
}: MobileToolBarProps) => {
    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2C2C2C] border-t border-black/30 pb-[env(safe-area-inset-bottom)] font-mono"
            aria-label="Mobile navigation"
        >
            <div className="flex justify-around items-stretch">
                {/* Contact is reached via the Contact button in the top bar on mobile, so it's omitted here to keep the bar uncluttered. */}
                {sections.filter((section) => section.id !== 'contact').map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;

                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 ${isActive ? 'text-cyan-400' : 'text-slate-400'
                                }`}
                            aria-label={`Go to ${section.label}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                            <span className="text-[10px] leading-none">{section.label}</span>
                        </button>
                    );
                })}

                <button
                    onClick={onOpenLayers}
                    className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 py-2 text-slate-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500"
                    aria-label="Open layers"
                >
                    <Layers className="w-5 h-5" aria-hidden="true" />
                    <span className="text-[10px] leading-none">Layers</span>
                </button>
            </div>
        </nav>
    );
};
