"use client";

import React from 'react';

interface MovingBorderProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    borderRadius?: string;
    duration?: number;
    as?: React.ElementType;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

/**
 * MovingBorder - Animated gradient border effect
 * Inspired by Aceternity UI's moving-border component
 * Uses conic-gradient with CSS animation
 */
export const MovingBorder = ({
    children,
    className = "",
    containerClassName = "",
    borderRadius = "0.75rem",
    duration = 3000,
    as: Component = "button",
    onClick,
    onMouseEnter,
    onMouseLeave,
}: MovingBorderProps) => {
    return (
        <Component
            className={`relative p-[2px] overflow-hidden ${containerClassName}`}
            style={{ borderRadius }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Animated gradient border */}
            <div
                className="absolute inset-0 moving-border-gradient"
                style={{
                    borderRadius,
                    animationDuration: `${duration}ms`,
                }}
            />

            {/* Content container */}
            <div
                className={`relative z-10 ${className}`}
                style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
            >
                {children}
            </div>
        </Component>
    );
};
