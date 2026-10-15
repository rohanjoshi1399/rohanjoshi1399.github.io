"use client";

import { useEffect, useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';

interface Tool {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
}

interface CustomCursorProps {
    cursorVariant: 'default' | 'hover';
    selectedTool: string;
    tools: Tool[];
}

export const CustomCursor = ({
    cursorVariant,
    selectedTool,
    tools
}: CustomCursorProps) => {
    const [isActive, setIsActive] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

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

    // Track the mouse by writing the transform directly, so moving the mouse
    // never re-renders React (previously the whole page re-rendered per frame).
    useEffect(() => {
        if (!isActive) return;

        let rafId: number | null = null;
        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%)`;
                    }
                    rafId = null;
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [isActive]);

    if (!isActive) return null;

    const activeTool = tools.find(t => t.id === selectedTool);
    const ToolIcon = activeTool ? activeTool.icon : MousePointer2;

    return (
        <div
            ref={cursorRef}
            className="fixed left-0 top-0 pointer-events-none z-[9999]"
            style={{ transform: 'translate(-100px, -100px)' }}
            aria-hidden="true"
        >
            <div className={`transition-transform duration-200 ${cursorVariant === 'hover' ? 'scale-110' : 'scale-100'}`}>
                <ToolIcon className="w-5 h-5 text-slate-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]" />
            </div>
        </div>
    );
};
