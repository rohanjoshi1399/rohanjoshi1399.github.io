"use client";

import { useState } from 'react';
import { Search, MoreHorizontal, Eye, EyeOff, Clock, Palette, Layers, Settings } from 'lucide-react';

interface Section {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface BrandColor {
    name: string;
    hex: string;
    rgb: string;
}

interface RightPanelProps {
    activeRightPanel: string;
    setActiveRightPanel: (panelId: string) => void;
    navigationHistory: string[];
    sections: Section[];
    brandColors: BrandColor[];
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
    personalInfo: {
        location: string;
    };
    hiddenSections: Set<string>;
    onToggleVisibility: (sectionId: string) => void;
}

export const RightPanel = ({
    activeRightPanel,
    setActiveRightPanel,
    navigationHistory,
    sections,
    brandColors,
    activeSection,
    scrollToSection,
    setCursorVariant,
    personalInfo,
    hiddenSections,
    onToggleVisibility
}: RightPanelProps) => {
    const rightPanels = [
        { id: 'history', label: 'History', icon: Clock },
        { id: 'color', label: 'Color', icon: Palette },
        { id: 'layers', label: 'Layers', icon: Layers },
        { id: 'properties', label: 'Props', icon: Settings }
    ];

    // Layers panel search state.
    const [layerSearchOpen, setLayerSearchOpen] = useState(false);
    const [layerQuery, setLayerQuery] = useState('');

    // Color panel copy feedback: index of the swatch currently showing "Copied!".
    const [copiedColorIdx, setCopiedColorIdx] = useState<number | null>(null);

    const handleCopyColor = async (hex: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopiedColorIdx(idx);
            setTimeout(() => {
                setCopiedColorIdx(prev => (prev === idx ? null : prev));
            }, 1000);
        } catch {
            // Clipboard may be unavailable (e.g. insecure context); fail silently.
        }
    };

    const filteredSections = layerQuery.trim()
        ? sections.filter(section =>
            section.label.toLowerCase().includes(layerQuery.trim().toLowerCase())
        )
        : sections;

    return (
        <aside
            className="w-56 lg:w-64 bg-[#323232] border-l border-black/30 hidden md:flex flex-col font-mono"
            aria-label="Properties sidebar"
        >
            <div className="bg-[#2C2C2C] flex border-b border-black/30" role="tablist">
                {rightPanels.map(panel => (
                    <button
                        key={panel.id}
                        onClick={() => setActiveRightPanel(panel.id)}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        role="tab"
                        aria-selected={activeRightPanel === panel.id}
                        aria-controls={`${panel.id}-panel`}
                        className={`flex-1 px-1 py-3 text-xs font-medium whitespace-nowrap text-center transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 cursor-pointer ${activeRightPanel === panel.id
                            ? 'bg-[#323232] text-white border-b-2 border-cyan-500'
                            : 'text-slate-400 hover:text-white hover:bg-[#323232]'
                            }`}
                    >
                        {panel.label}
                    </button>
                ))}
            </div>

            {/* History Panel */}
            {activeRightPanel === 'history' && (
                <div className="flex-1 p-3 overflow-auto">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Navigation History</h4>
                    <div className="space-y-1">
                        {navigationHistory.slice().reverse().map((sectionId, idx) => {
                            const section = sections.find(s => s.id === sectionId);
                            if (!section) return null;
                            const Icon = section.icon;
                            return (
                                <button
                                    key={`${sectionId}-${idx}`}
                                    onClick={() => scrollToSection(sectionId)}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#3C3C3C] transition-colors text-left cursor-pointer"
                                >
                                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="text-xs text-slate-300 capitalize flex-1">{sectionId}</span>
                                    <span className="text-xs text-slate-400">{navigationHistory.length - idx}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Color Picker Panel */}
            {activeRightPanel === 'color' && (
                <div className="flex-1 p-4 overflow-y-auto">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-4">Brand Colors</h4>
                    <div className="space-y-3">
                        {brandColors.map((color, idx) => (
                            <div key={idx} className="bg-[#2C2C2C] rounded-lg p-3 border border-slate-700/50">
                                <div
                                    className="w-full h-12 rounded-lg mb-2 shadow-lg cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    style={{ backgroundColor: color.hex }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Copy ${color.hex}`}
                                    onClick={() => handleCopyColor(color.hex, idx)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleCopyColor(color.hex, idx);
                                        }
                                    }}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                />
                                <div className="text-xs text-slate-300 font-medium mb-1">{color.name}</div>
                                <div className={`text-xs ${copiedColorIdx === idx ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {copiedColorIdx === idx ? 'Copied!' : color.hex}
                                </div>
                                <div className="text-xs text-slate-400">{color.rgb}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Layers Panel */}
            {activeRightPanel === 'layers' && (
                <div className="flex-1 flex flex-col">
                    <div className="bg-[#2C2C2C] px-3 py-2 border-b border-black/30 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">Layers</span>
                        <div className="flex gap-1">
                            <button
                                onClick={() => {
                                    setLayerSearchOpen(open => {
                                        if (open) setLayerQuery('');
                                        return !open;
                                    });
                                }}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded cursor-pointer ${layerSearchOpen ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                                aria-label="Search layers"
                                aria-pressed={layerSearchOpen}
                            >
                                <Search className="w-3.5 h-3.5" />
                            </button>
                            <button className="text-slate-400 hover:text-white transition-colors" aria-label="More options">
                                <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {layerSearchOpen && (
                        <div className="bg-[#2C2C2C] px-3 py-2 border-b border-black/30">
                            <input
                                type="text"
                                value={layerQuery}
                                onChange={(e) => setLayerQuery(e.target.value)}
                                autoFocus
                                placeholder="Filter layers..."
                                aria-label="Filter layers by name"
                                className="w-full bg-[#1a1a1a] border border-black/30 rounded px-2 py-1 text-xs text-slate-300 placeholder:text-slate-600 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    )}

                    <div className="flex-1 overflow-auto p-2">
                        <div className="space-y-1">
                            {filteredSections.length === 0 ? (
                                <div className="text-xs text-slate-400 px-2 py-2">No layers match &ldquo;{layerQuery}&rdquo;</div>
                            ) : filteredSections.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                const isHidden = hiddenSections.has(section.id);

                                return (
                                    <div
                                        key={section.id}
                                        className={`flex items-center gap-2 p-2 rounded transition-all duration-200 ${isActive ? 'bg-[#1473E6] shadow-lg' : 'hover:bg-[#3C3C3C]'
                                            } ${isHidden ? 'opacity-50' : 'opacity-100'}`}
                                    >
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleVisibility(section.id);
                                            }}
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                            className="cursor-pointer hover:text-cyan-400 transition-colors hover:bg-[#3C3C3C] rounded flex items-center justify-center w-12 flex-shrink-0 self-stretch"
                                            role="button"
                                            aria-label={isHidden ? `Show ${section.label}` : `Hide ${section.label}`}
                                            title={isHidden ? `Show ${section.label}` : `Hide ${section.label}`}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    onToggleVisibility(section.id);
                                                }
                                            }}
                                        >
                                            {isHidden ? (
                                                <EyeOff className="w-4 h-4 text-slate-500" aria-hidden="true" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-slate-400" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div
                                            className="flex items-center gap-2 flex-1 cursor-pointer group"
                                            onClick={() => scrollToSection(section.id)}
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                        >
                                            <div className={`w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded border border-slate-600 flex items-center justify-center flex-shrink-0 shadow-md ${isHidden ? 'grayscale' : ''
                                                }`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-xs truncate font-semibold ${isHidden ? 'text-slate-500 line-through' : 'text-slate-300'
                                                    }`}>{section.label}</div>
                                                <div className="text-xs text-slate-400">Normal • RGB/8</div>
                                            </div>
                                            <div className="text-xs text-slate-400 font-medium">{isHidden ? '0%' : '100%'}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-[#2C2C2C] px-2 py-3 border-t border-black/30 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Opacity: 100%</span>
                    </div>
                </div>
            )}

            {/* Properties Panel */}
            {activeRightPanel === 'properties' && (
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-3">
                        <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Quick Info</h4>
                            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
                                <span className="text-slate-400">Role:</span>
                                <span className="text-cyan-400 font-semibold">Software Engineer</span>
                                <span className="text-slate-400">Status:</span>
                                <span className="text-cyan-400 font-semibold">Graduate Student</span>
                                <span className="text-slate-400">Location:</span>
                                <span className="text-cyan-400 font-semibold">{personalInfo.location}</span>
                                <span className="text-slate-400">Experience:</span>
                                <span className="text-cyan-400 font-semibold">4+ Years</span>
                            </div>
                        </div>

                        <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Current Section</h4>
                            <div className="text-sm text-white font-semibold capitalize">{activeSection}</div>
                        </div>

                        <div className="bg-[#2C2C2C] rounded-lg p-4 border border-slate-700/50">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">Interests</h4>
                            <div className="space-y-1.5">
                                {['AI/ML Systems', 'Distributed Architecture', 'Wildlife Photography'].map((area, idx) => (
                                    <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                                        {area}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};
