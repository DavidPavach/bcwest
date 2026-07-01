export default function KeyValueBlock({ title, data }: { title: string, data: Record<string, string | number> }) {

    const entries = Object.entries(data || {});
    if (entries.length === 0) return null;

    return (
        <div className="flex flex-col">
            <div className="bg-accent px-3 py-1.5 font-bold text-[11px] uppercase tracking-wide">
                {title}
            </div>
            <div className="flex flex-col">
                {entries.map(([key, value], idx) => (
                    <div
                        key={key}
                        className="flex items-start px-3 py-1.5 text-[11px]"
                        style={{
                            borderTop: idx === 0 ? "none" : "1px solid #ECECEC",
                            backgroundColor: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                        }}
                    >
                        <span className="w-2/5 font-semibold" style={{ color: "#444" }}>
                            {key}
                        </span>
                        <span className="w-3/5" style={{ color: "#111" }}>
                            : {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}