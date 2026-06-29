"use client";

import { useEffect, useState } from 'react';
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
    const [isActive, setIsActive] = useState(false);

    // Only take over the cursor on a genuine desktop pointer (large screen, a
    // real mouse, no reduced-motion preference). Starts false so SSR / no-JS
    // always keeps the native cursor.
    useEffect(() => {
        const queries = [
            window.matchMedia('(min-width: 1024px)'),
            window.matchMedia('(pointer: fine)'),
            window.matchMedia('(prefers-reduced-motion: no-preference)'),
        ];
        const update = () => setIsActive(queries.every((q) => q.matches));
        update();
        queries.forEach((q) => q.addEventListener('change', update));
        return () => queries.forEach((q) => q.removeEventListener('change', update));
    }, []);

    // Hide the native cursor ONLY while the custom cursor is mounted and active.
    // The CSS that hides it is gated on this class, so a JS failure or an
    // unsupported device always falls back to the system cursor.
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('custom-cursor-active', isActive);
        return () => root.classList.remove('custom-cursor-active');
    }, [isActive]);

    if (!isActive) return null;

    const activeTool = tools.find(t => t.id === selectedTool);
    const ToolIcon = activeTool ? activeTool.icon : MousePointer2;

    return (
        <div
            className="fixed pointer-events-none z-[9999] transition-transform duration-100"
            style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: 'translate(-50%, -50%)'
            }}
            aria-hidden="true"
        >
            <div className={`transition-all duration-200 ${cursorVariant === 'hover' ? 'scale-110' : 'scale-100'}`}>
                <ToolIcon className="w-5 h-5 text-cyan-400 drop-shadow-lg" />
            </div>
        </div>
    );
};
