"use client";

interface Tool {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
}

interface ToolBarProps {
    tools: Tool[];
    selectedTool: string;
    setSelectedTool: (toolId: string) => void;
    setCursorVariant: (variant: 'default' | 'hover') => void;
}

// Decorative: tools only swap the custom cursor icon, so the bar is hidden
// from assistive tech and kept out of the tab order (mouse only).
export const ToolBar = ({ tools, selectedTool, setSelectedTool, setCursorVariant }: ToolBarProps) => {
    return (
        <div className="w-12 bg-[#323232] border-r border-black/30 hidden md:flex flex-col items-center py-3 gap-1" aria-hidden="true">
            {tools.map((tool) => {
                const ToolIcon = tool.icon;
                const isActive = selectedTool === tool.id;
                return (
                    <button
                        key={tool.id}
                        tabIndex={-1}
                        onClick={() => setSelectedTool(tool.id)}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className={`w-11 h-11 flex items-center justify-center rounded transition-colors cursor-pointer ${isActive
                                ? 'bg-[#3C3C3C] text-white'
                                : 'text-slate-500 hover:bg-[#3C3C3C] hover:text-white'
                            }`}
                        title={tool.name}
                    >
                        <ToolIcon className="w-4 h-4" />
                    </button>
                );
            })}
        </div>
    );
};
