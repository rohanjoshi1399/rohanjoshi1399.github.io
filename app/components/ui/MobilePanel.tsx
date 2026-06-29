"use client";

import { useEffect } from 'react';
import { Layers, X, Eye, EyeOff } from 'lucide-react';

interface Section {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface MobilePanelProps {
    sections: Section[];
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
    hiddenSections: Set<string>;
    onToggleVisibility: (sectionId: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const MobilePanel = ({
    sections,
    activeSection,
    scrollToSection,
    hiddenSections,
    onToggleVisibility,
    isOpen,
    onClose
}: MobilePanelProps) => {
    // Close the sheet on Escape while it is open
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Bottom Sheet */}
            <div
                className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#323232] rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)] ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                role="dialog"
                aria-label="Layers"
                aria-hidden={!isOpen}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1.5 rounded-full bg-slate-600" aria-hidden="true" />
                </div>

                {/* Header */}
                <div className="px-4 pb-3 pt-1 border-b border-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                        <h2 className="text-lg font-bold text-white">Layers</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Close layers"
                    >
                        <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    </button>
                </div>

                {/* Sections List */}
                <div className="p-4 space-y-2 overflow-y-auto max-h-[75vh]">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        const isHidden = hiddenSections.has(section.id);

                        return (
                            <div
                                key={section.id}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${isActive
                                    ? 'bg-cyan-600'
                                    : isHidden
                                        ? 'bg-slate-800/50 opacity-50'
                                        : 'bg-slate-800'
                                    }`}
                            >
                                {/* Row body navigates */}
                                <button
                                    onClick={() => {
                                        scrollToSection(section.id);
                                        onClose();
                                    }}
                                    className="flex items-center gap-3 flex-1 min-h-[44px] text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                                    aria-current={isActive ? 'page' : undefined}
                                    aria-label={`Go to ${section.label}`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                        } ${isHidden ? 'grayscale' : ''}`}>
                                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-semibold ${isHidden ? 'line-through text-slate-500' : 'text-white'}`}>
                                            {section.label}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {isHidden ? 'Hidden' : 'Visible'}
                                        </div>
                                    </div>
                                </button>

                                {/* Explicit visibility toggle - does NOT navigate */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleVisibility(section.id);
                                    }}
                                    className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-black/20 transition-colors flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                    aria-label={isHidden ? `Show ${section.label}` : `Hide ${section.label}`}
                                >
                                    {isHidden ? (
                                        <EyeOff className="w-5 h-5 text-slate-400" aria-hidden="true" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-slate-200" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
