interface AvailabilityChipProps {
    text: string;
    className?: string;
}

/** Status chip for job availability. Renders nothing when the text is empty. */
export const AvailabilityChip = ({ text, className = '' }: AvailabilityChipProps) => {
    if (!text) return null;

    return (
        <span
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-ps-green/30 bg-ps-green/10 text-ps-green text-xs font-mono font-medium whitespace-nowrap ${className}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-ps-green flex-shrink-0" aria-hidden="true" />
            {text}
        </span>
    );
};
