import { AddSquare, CloseSquare } from "iconsax-reactjs";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

type ItemProps = {
    items: TsrItem[];
    onChange: (items: TsrItem[]) => void;
};

export default function LineItemsEditor({ items = [], onChange }: ItemProps) {

    const updateItem = (idx: number, field: string, value: string | number) => {
        const next = [...items];
        next[idx] = {
            ...next[idx],
            [field]: field === "amount" ? Number(value) : value,
        };
        onChange(next);
    };

    const addItem = () => {
        onChange([
            ...items,
            { description: "", quantityText: "", rateText: "", amount: 0 },
        ]);
    };

    const removeItem = (idx: number) => {
        onChange(items.filter((_, i) => i !== idx));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                    Line Items (Charges)
                </span>
                <Button
                    className="flex items-center gap-x-2 text-[10px] md:text-[11px] xl:text-xs"
                    onClick={addItem}
                >
                    <AddSquare className="size-3 md:size-3.5 xl:size-4" /> Add Item
                </Button>
            </div>

            {items.length === 0 && (
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm italic">
                    At least one line item is required.
                </p>
            )}

            {items.map((item, idx) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <>
                    key={`lineItem-${idx}`}
                    className="items-center gap-2 grid grid-cols-12 mb-2"
                >
                    <div className="space-y-1 col-span-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(idx, "description", e.target.value)}
                            placeholder="Description"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="text"
                            value={item.quantityText}
                            onChange={(e) => updateItem(idx, "quantityText", e.target.value)}
                            placeholder="Quantity"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="rate">Rate</Label>
                        <Input
                            id="rate"
                            type="text"
                            value={item.rateText}
                            onChange={(e) => updateItem(idx, "rateText", e.target.value)}
                            placeholder="Rate"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={item.amount}
                            onChange={(e) => updateItem(idx, "amount", e.target.value)}
                            placeholder="Amount"
                        />
                    </div>
                    <div className="flex justify-center col-span-2">
                        <Button
                            variant="outline"
                            onClick={() => removeItem(idx)}
                            className="hover:text-destructive"
                        >
                            <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
