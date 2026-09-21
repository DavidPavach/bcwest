type TankDetailsProps = {
    tanks: TsrTank[];
    nonResponsive?: boolean;
};

export default function TankDetails({
    tanks,
    nonResponsive = false,
}: TankDetailsProps) {

    if (!tanks || tanks.length === 0) return null;

    const totalCapacity = tanks.reduce(
        (sum, tank) => sum + (tank.capacity || 0),
        0
    );

    const totalUllage = tanks.reduce(
        (sum, tank) => sum + (tank.ullage || 0),
        0
    );

    const titleClassName = nonResponsive
        ? "px-3 py-2 border border-border font-bold text-sm text-center uppercase tracking-wide"
        : "px-3 py-2 border border-border font-bold text-[11px] md:text-xs xl:text-sm text-center uppercase tracking-wide";

    const columnHeaderClassName = nonResponsive
        ? "px-3 py-1.5 font-bold text-sm uppercase tracking-wide"
        : "px-3 py-1.5 font-bold text-[11px] md:text-xs xl:text-sm uppercase tracking-wide";

    const rowClassName = nonResponsive
        ? "*:px-3 *:py-1.5 *:border *:border-border *:text-xs"
        : "*:px-3 *:py-1.5 *:border *:border-border *:text-[10px] md:*:text-[11px] xl:*:text-xs";

    const totalRowClassName = nonResponsive
        ? "bg-muted/10 *:px-3 *:py-1.5 *:border *:border-border *:font-bold *:text-xs"
        : "bg-muted/10 *:px-3 *:py-1.5 *:border *:border-border *:font-bold *:text-[10px] md:*:text-[11px] xl:*:text-xs";

    return (
        <div>
            <table className="w-full">
                <thead className="bg-muted">
                    <tr>
                        <th colSpan={5} className={titleClassName}>
                            Tank Details
                        </th>
                    </tr>

                    <tr>
                        {[
                            "Tank No.",
                            "GPS Coordinates",
                            "Product",
                            "Capacity (MT)",
                            "Ullage (MT)",
                        ].map((header, index) => (
                            <th
                                key={header}
                                className={`${columnHeaderClassName} ${index < 2
                                    ? "text-left"
                                    : "text-right"
                                    } ${index < 3
                                        ? "border border-border"
                                        : ""
                                    }`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tanks.map((tank, index) => (
                        <tr
                            // biome-ignore lint/suspicious/noArrayIndexKey: <>
                            key={`tanks_details_${index}`}
                            className={rowClassName}
                        >
                            <td>{tank.tankNo}</td>

                            <td>{tank.coordinates}</td>

                            <td>{tank.product}</td>

                            <td className="text-right">
                                {tank.capacity.toLocaleString("en-US")}
                            </td>

                            <td className="text-right">
                                {tank.ullage.toLocaleString("en-US", {
                                    minimumFractionDigits: 3,
                                })}
                            </td>
                        </tr>
                    ))}

                    <tr className={totalRowClassName}>
                        <td colSpan={3}>Total Capacity</td>

                        <td className="text-right">
                            {totalCapacity.toLocaleString("en-US")}
                        </td>

                        <td className="text-right">
                            {totalUllage.toLocaleString("en-US", {
                                minimumFractionDigits: 3,
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
