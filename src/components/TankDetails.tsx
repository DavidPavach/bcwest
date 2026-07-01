
export default function TankDetails({ tanks }: { tanks: TsrTank[] }) {

    if (!tanks || tanks.length === 0) return null;

    const totalCapacity = tanks.reduce((s, t) => s + (t.capacity || 0), 0);
    const totalUllage = tanks.reduce((s, t) => s + (t.ullage || 0), 0);

    return (
        <div>
            <table className="w-full">
                <thead className="bg-muted">
                    <tr>
                        <th colSpan={4} className="px-3 py-2 border border-border font-bold text-[11px] md:text-xs xl:text-sm text-center uppercase tracking-wide">
                            Tank Details
                        </th>
                    </tr>
                    <tr>
                        {["Tank No.", "Product", "Capacity (MT)", "Ullage (MT)"].map((h, i) => (
                            <th key={h}
                                className={`${i < 2 ? "text-left" : "text-right"} ${i < 3 ? "border border-border" : ""} px-3 py-1.5 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide`}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tanks.map((t, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <>
                        <tr key={`tanks_details_${idx}`} className="*:px-3 *:py-1.5 *:border *:border-border md:*:text-[11px] *:text-[10px] xl:*:text-xs">
                            <td>
                                {t.tankNo}
                            </td>
                            <td>
                                {t.product}
                            </td>
                            <td className="text-right">
                                {t.capacity.toLocaleString("en-US")}
                            </td>
                            <td className="text-right">
                                {t.ullage.toLocaleString("en-US", { minimumFractionDigits: 3 })}
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-muted/10 *:px-3 *:py-1.5 *:border *:border-border *:font-bold md:*:text-[11px] *:text-[10px] xl:*:text-xs">
                        <td colSpan={2}>
                            Total Capacity
                        </td>
                        <td className="text-right">
                            {totalCapacity.toLocaleString("en-US")}
                        </td>
                        <td className="text-right">
                            {totalUllage.toLocaleString("en-US", { minimumFractionDigits: 3 })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}