interface LabelProps {
    children: React.ReactNode;
    as?: 'h3' | 'h4';
    variant?: 'heading' | 'caps';
    className?: string;
}

/**
 * Sub-heading used inside every canvas block, in the one accent colour.
 * "heading" for content blocks (The Problem, What I Built...), "caps" for
 * small category labels (skill groups, Key Courses).
 */
export const Label = ({ children, as: Heading = 'h4', variant = 'heading', className = '' }: LabelProps) => (
    <Heading
        className={`text-ps-accent ${variant === 'caps'
            ? 'text-sm font-bold uppercase tracking-wide'
            : 'text-lg font-semibold'
            } ${className}`}
    >
        {children}
    </Heading>
);
