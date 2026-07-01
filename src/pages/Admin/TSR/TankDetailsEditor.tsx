import { AddSquare, CloseSquare } from "iconsax-reactjs";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

type TankProps = {
    tanks: TsrTank[];
    onChange: (tanks: TsrTank[]) => void;
}
export default function TankDetailsEditor({ tanks = [], onChange }: TankProps) {

    const updateTank = (idx: number, field: string, value: string | number) => {
        const next = [...tanks];
        next[idx] = {
            ...next[idx],
            [field]: field === "capacity" || field === "ullage" ? Number(value) : value,
        };
        onChange(next);
    };

    const addTank = () => {
        onChange([...tanks, { tankNo: "", product: "", capacity: 0, ullage: 0 }]);
    };

    const removeTank = (idx: number) => {
        onChange(tanks.filter((_, i) => i !== idx));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                    Tank Details (Optional)
                </span>
                <Button
                    className="flex items-center gap-x-2 text-[10px] md:text-[11px] xl:text-xs"
                    onClick={addTank}
                >
                    <AddSquare className="size-3 md:size-3.5 xl:size-4" /> Add Tank
                </Button>
            </div>

            {tanks.length === 0 && (
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm italic">
                    No tank details added.
                </p>
            )}

            {tanks.map((tank, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <>
                <div key={`tank-${idx}`} className="items-center gap-2 grid grid-cols-12 mb-2">
                    <div className="space-y-1 col-span-3">
                        <Label htmlFor="tankNo">Tank Number</Label>
                        <Input
                            id="tankNo"
                            type="text"
                            value={tank.tankNo}
                            onChange={(e) => updateTank(idx, "tankNo", e.target.value)}
                            placeholder="Tank No."
                        />
                    </div>
                    <div className="space-y-1 col-span-3">
                        <Label htmlFor="tankProduct">Tank Product</Label>
                        <Input
                            id="tankProduct"
                            type="text"
                            value={tank.product}
                            onChange={(e) => updateTank(idx, "product", e.target.value)}
                            placeholder="Product"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="tankCapacity">Tank Capacity</Label>
                        <Input
                            id="tankCapacity"
                            type="number"
                            step="1"
                            value={tank.capacity}
                            onChange={(e) => updateTank(idx, "capacity", e.target.value)}
                            placeholder="Capacity (MT)"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label htmlFor="tankUllage">Tank Ullage</Label>
                        <Input
                            id="tankUllage"
                            type="number"
                            step="0.001"
                            value={tank.ullage}
                            onChange={(e) => updateTank(idx, "ullage", e.target.value)}
                            placeholder="Ullage (MT)"
                        />
                    </div>
                    <div className="flex justify-center col-span-2">
                        <Button
                            variant="outline"
                            onClick={() => removeTank(idx)}
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