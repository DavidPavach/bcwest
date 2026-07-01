import { CloseSquare, Sms } from "iconsax-reactjs";

import { Button } from "#/components/ui/button";

const View = ({
    quote,
    onClose,
}: {
    quote: Quote;
    onClose: () => void;
}) => {
    return (
        <main className="border border-border">
            <div className="flex justify-between items-start mb-5 p-4 border-border border-b">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-heading font-bold text-base md:text-lg xl:text-xl">
                            {quote.company}
                        </h2>
                    </div>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        <span className="text-muted-foreground">Product:</span> {quote.productName}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="hover:bg-destructive/10 p-1.5 rounded-lg hover:text-destructive transition-colors cursor-pointer"
                >
                    <CloseSquare className="size-4" />
                </button>
            </div>
            <div className="space-y-3 mb-5 p-4">
                {[
                    { label: "Email", value: quote.email },
                    { label: "Terminal ID", value: quote.terminalId },
                    { label: "Quantity", value: quote.quantity.toString() },
                    { label: "Days", value: quote.days.toString() },
                    {
                        label: "Est. Cost",
                        value: `$${quote.calculatedCost.toLocaleString()}`
                    },
                    {
                        label: "Date",
                        value: new Date(quote.createdAt).toLocaleString(),
                    },
                ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3">
                        <span className="mt-0.5 w-20 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs shrink-0">
                            {label}
                        </span>
                        <span className="text-[11px] md:text-xs xl:text-sm">{value}</span>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 p-4">
                <Button className="flex-1 bg-primary text-primary-foreground" asChild>
                    <a href={`mailto:${quote.email}`}>
                        <Sms className="mr-2 size-4" /> Reply via Email
                    </a>
                </Button>
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
            </div>
        </main>
    );
};

export default View;