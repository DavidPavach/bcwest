type KeyValueBlockProps = {
    title: string;
    data: Record<string, string | number>;
    nonResponsive?: boolean;
};

export default function KeyValueBlock({
    title,
    data,
    nonResponsive = false,
}: KeyValueBlockProps) {
    const entries = Object.entries(data || {});

    if (entries.length === 0) return null;

    const titleClassName = nonResponsive
        ? "px-3 py-1.5 border-border border-b-2 font-bold text-sm uppercase tracking-wide"
        : "px-3 py-1.5 border-border border-b-2 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide";

    const rowClassName = nonResponsive
        ? "flex items-start px-3 py-1.5 text-xs"
        : "flex items-start px-3 py-1.5 text-[10px] md:text-[11px] xl:text-xs";

    return (
        <div className="flex flex-col">
            <div className={titleClassName}>
                {title}
            </div>

            <div className="flex flex-col">
                {entries.map(([key, value], idx) => (
                    <div
                        key={key}
                        className={`${idx === 0 ? "" : "border-t border-border"} ${idx % 2 === 0 ? "bg-muted/10" : ""
                            } ${rowClassName}`}
                    >
                        <span
                            className={
                                nonResponsive
                                    ? "w-1/5 font-semibold text-muted-foreground shrink-0"
                                    : "md:w-1/5 font-semibold text-muted-foreground shrink-0"
                            }
                        >
                            {key} :
                        </span>

                        <span
                            className={
                                nonResponsive
                                    ? "ml-1 w-4/5"
                                    : "ml-1 md:w-4/5"
                            }
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
