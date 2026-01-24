"use client";

import { useRef, useState, useCallback } from 'react';

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightSize?: number;
}

/**
 * Spotlight - Cursor-following radial gradient effect
 * Inspired by Aceternity UI's spotlight component
 * Creates an interactive highlight that follows the mouse
 */
export const Spotlight = ({
    children,
    className = "",
    spotlightColor = "rgba(6, 182, 212, 0.15)",
    spotlightSize = 400,
}: SpotlightProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Spotlight overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
                }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-[2]">
                {children}
            </div>
        </div>
    );
};
