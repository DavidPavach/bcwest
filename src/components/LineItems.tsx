import { formatCurrency } from "#/utils/format";

export default function LineItems({ items, currency }: { items: TsrItem[], currency: string }) {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr className="bg-muted border border-border">
                        {["NO.", "DES", "QUANTITY", "RATE", `AMOUNT (${currency})`].map((h, i) => (
                            <th
                                key={h}
                                className={`px-3 py-2 bg-muted/10 ${i < 4 ? "border-r border-border" : ""} font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide text-center`}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <>
                        <tr key={`line_item_${idx}`} className={`*:px-3 *:py-2 *:text-[10px] md:*:text-[11px] xl:*:text-xs *:text-center *:border-border *:border ${idx % 2 === 0 ? "bg-muted/10" : ""}`}>
                            <td>
                                {idx + 1}
                            </td>
                            <td className="px-3 py-2 text-[11px]">
                                {item.description}
                            </td>
                            <td>
                                {item.quantityText}
                            </td>
                            <td>
                                {item.rateText}
                            </td>
                            <td className="text-right">
                                {formatCurrency(item.amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}