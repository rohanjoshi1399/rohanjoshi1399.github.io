interface TagProps {
    children: React.ReactNode;
    variant?: 'default' | 'status';
}

/**
 * The one chip style on the canvas: neutral for tech stacks and courses,
 * accent-outlined for status (e.g. "Research", "4.0 GPA").
 */
export const Tag = ({ children, variant = 'default' }: TagProps) => (
    <span
        className={
            variant === 'status'
                ? 'inline-flex items-center px-2 py-0.5 rounded border border-ps-accent/40 text-ps-accent text-[11px] font-mono font-semibold uppercase tracking-wider'
                : 'inline-flex items-center px-3 py-1 rounded-md border border-[#474747] bg-[#323232] text-sm text-slate-300'
        }
    >
        {children}
    </span>
);
