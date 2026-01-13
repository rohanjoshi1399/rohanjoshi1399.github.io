"use client";

import { MousePointer2 } from 'lucide-react';

interface Tool {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
}

interface CustomCursorProps {
    cursorPosition: { x: number; y: number };
    cursorVariant: 'default' | 'hover';
    selectedTool: string;
    tools: Tool[];
}

export const CustomCursor = ({
    cursorPosition,
    cursorVariant,
    selectedTool,
    tools
}: CustomCursorProps) => {
    const activeTool = tools.find(t => t.id === selectedTool);
    const ToolIcon = activeTool ? activeTool.icon : MousePointer2;

    return (
        <div
            className="fixed pointer-events-none z-50 transition-transform duration-100 hidden md:block"
            style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div className={`transition-all duration-200 ${cursorVariant === 'hover' ? 'scale-110' : 'scale-100'}`}>
                <ToolIcon className="w-5 h-5 text-cyan-400 drop-shadow-lg" />
            </div>
        </div>
    );
};
