
export default function KeyValueBlock({ title, data }: { title: string, data: Record<string, string | number> }) {

    const entries = Object.entries(data || {});
    if (entries.length === 0) return null;

    return (
        <div className="flex flex-col">
            <div
                className="px-3 py-1.5 border-border border-b-2 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide"            >
                {title}
            </div>
            <div className="flex flex-col">
                {entries.map(([key, value], idx) => (
                    <div
                        key={key}
                        className={`${idx === 0 ? "" : "border-t border-border"} ${idx % 2 === 0 ? "bg-muted/10" : ""} flex items-start px-3 py-1.5 text-[10px] md:text-[11px] xl:text-xs`}
                    >
                        <span className="md:w-1/5 font-semibold text-muted-foreground shrink-0">
                            {key} :
                        </span>
                        <span className="ml-1 md:w-4/5">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}