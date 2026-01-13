"use client";

import { useState } from 'react';
import { Layers, X, ChevronRight } from 'lucide-react';

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
}

export const MobilePanel = ({
    sections,
    activeSection,
    scrollToSection,
    hiddenSections,
    onToggleVisibility
}: MobilePanelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Panel Toggle Button - Only visible on small screens */}
            <button
                onClick={togglePanel}
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl transition-all active:scale-95"
                aria-label={isOpen ? "Close layers panel" : "Open layers panel"}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                    <Layers className="w-6 h-6" aria-hidden="true" />
                )}
            </button>

            {/* Mobile Panel Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-30"
                    onClick={togglePanel}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Panel Drawer */}
            <div
                className={`lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#323232] z-40 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-label="Layers panel"
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="bg-[#2C2C2C] p-4 border-b border-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                        <h2 className="text-lg font-bold text-white">Layers</h2>
                    </div>
                    <button
                        onClick={togglePanel}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Close panel"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Sections List */}
                <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">
                        Tap to navigate • Long press to toggle
                    </p>
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        const isHidden = hiddenSections.has(section.id);

                        return (
                            <button
                                key={section.id}
                                onClick={() => {
                                    scrollToSection(section.id);
                                    setIsOpen(false);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onToggleVisibility(section.id);
                                }}
                                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${isActive
                                        ? 'bg-cyan-600 text-white'
                                        : isHidden
                                            ? 'bg-slate-800/50 opacity-50'
                                            : 'bg-slate-800 hover:bg-slate-700'
                                    }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                    } ${isHidden ? 'grayscale' : ''}`}>
                                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className={`font-semibold ${isHidden ? 'line-through text-slate-500' : 'text-white'}`}>
                                        {section.label}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        {isHidden ? 'Hidden' : 'Visible'}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" aria-hidden="true" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
