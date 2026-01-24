"use client";

/**
 * BackgroundBeams - Animated SVG beam effect
 * Inspired by Aceternity UI's background-beams component
 * Pure CSS animation, no dependencies
 */
export const BackgroundBeams = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
            <svg
                className="absolute w-full h-full"
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradient for beams */}
                    <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.3)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </linearGradient>
                    <linearGradient id="beam-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.25)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                    </linearGradient>
                    <linearGradient id="beam-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.2)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                </defs>

                {/* Beam paths with animation */}
                <path
                    d="M-100,200 Q250,100 500,300 T1100,200"
                    fill="none"
                    stroke="url(#beam-gradient-1)"
                    strokeWidth="2"
                    className="beam beam-1"
                />
                <path
                    d="M-100,350 Q300,250 600,400 T1100,300"
                    fill="none"
                    stroke="url(#beam-gradient-2)"
                    strokeWidth="1.5"
                    className="beam beam-2"
                />
                <path
                    d="M-100,450 Q400,350 700,500 T1100,400"
                    fill="none"
                    stroke="url(#beam-gradient-3)"
                    strokeWidth="2"
                    className="beam beam-3"
                />
                <path
                    d="M-100,100 Q200,200 400,50 T1100,150"
                    fill="none"
                    stroke="url(#beam-gradient-1)"
                    strokeWidth="1"
                    className="beam beam-4"
                />
                <path
                    d="M-100,550 Q350,450 650,550 T1100,500"
                    fill="none"
                    stroke="url(#beam-gradient-2)"
                    strokeWidth="1.5"
                    className="beam beam-5"
                />
            </svg>
        </div>
    );
};
