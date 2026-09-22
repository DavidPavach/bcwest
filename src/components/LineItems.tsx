import { formatCurrency } from "#/utils/format";

type LineItemsProps = {
    items: TsrLineItem[];
    currency: string;
    nonResponsive?: boolean;
};

export default function LineItems({
    items,
    currency,
    nonResponsive = false,
}: LineItemsProps) {
    const headerClassName = nonResponsive
        ? "px-3 py-2 bg-muted/10 font-bold text-sm uppercase tracking-wide"
        : "px-3 py-2 bg-muted/10 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide";

    const rowClassName = nonResponsive
        ? "*:px-3 *:py-2 *:text-xs *:border-border *:border"
        : "*:px-3 *:py-2 *:text-[10px] md:*:text-[11px] xl:*:text-xs *:border-border *:border";

    const descriptionClassName = nonResponsive
        ? "px-3 py-2 text-xs"
        : "px-3 py-2 text-[11px]";

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr className="bg-muted border border-border">
                        {[
                            "NO.",
                            "DES",
                            "QUANTITY",
                            "RATE",
                            `AMOUNT (${currency})`,
                        ].map((header, index) => (
                            <th
                                key={header}
                                className={`${headerClassName} ${index < 3 ? "text-left" : "text-right"} ${index < 4 ? "border-r border-border" : ""}`}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr
                            // biome-ignore lint/suspicious/noArrayIndexKey: <>
                            key={`line_item_${index}`}
                            className={`${rowClassName} ${index % 2 === 0 ? "bg-muted/10" : ""}`}>

                            <td>{index + 1}</td>

                            <td className={descriptionClassName}>
                                {item.description}
                            </td>

                            <td>{item.quantityText}</td>

                            <td className="text-right">{item.rateText}</td>

                            <td className="text-right">{formatCurrency(item.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
