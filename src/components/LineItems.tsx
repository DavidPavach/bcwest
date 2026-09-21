import { formatCurrency } from "#/utils/format";

type LineItemsProps = {
    items: TsrItem[];
    currency: string;
    nonResponsive?: boolean;
};

export default function LineItems({
    items,
    currency,
    nonResponsive = false,
}: LineItemsProps) {
    const headerClassName = nonResponsive
        ? "px-3 py-2 bg-muted/10 font-bold text-sm uppercase tracking-wide text-center"
        : "px-3 py-2 bg-muted/10 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide text-center";

    const rowClassName = nonResponsive
        ? "*:px-3 *:py-2 *:text-xs *:text-center *:border-border *:border"
        : "*:px-3 *:py-2 *:text-[10px] md:*:text-[11px] xl:*:text-xs *:text-center *:border-border *:border";

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
                                className={`${headerClassName} ${index < 4
                                    ? "border-r border-border"
                                    : ""
                                    }`}
                            >
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
                            className={`${rowClassName} ${index % 2 === 0 ? "bg-muted/10" : ""
                                }`}
                        >
                            <td>{index + 1}</td>

                            <td className={descriptionClassName}>
                                {item.description}
                            </td>

                            <td>{item.quantityText}</td>

                            <td>{item.rateText}</td>

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
