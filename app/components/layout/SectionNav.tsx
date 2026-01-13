"use client";

interface Section {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface SectionNavProps {
    sections: Section[];
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

export const SectionNav = ({ sections, activeSection, scrollToSection, setCursorVariant }: SectionNavProps) => {
    return (
        <nav
            className="bg-[#2C2C2C] border-b border-black/30 flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory"
            aria-label="Section navigation"
            role="tablist"
        >
            {sections.map(section => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    role="tab"
                    aria-selected={activeSection === section.id}
                    className={`min-w-max px-4 md:px-6 py-3 md:py-3 text-xs md:text-sm border-r border-black/30 flex items-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 cursor-pointer snap-start ${activeSection === section.id
                        ? 'bg-[#242424] text-white border-b-2 border-cyan-500 font-semibold'
                        : 'bg-[#2C2C2C] text-slate-400 hover:text-white hover:bg-[#323232] active:bg-[#3C3C3C]'
                        }`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                >
                    <section.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="hidden sm:inline">{section.label}</span>
                </button>
            ))}
        </nav>
    );
};
