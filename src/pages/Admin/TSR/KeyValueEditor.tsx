import { AddSquare, CloseSquare } from "iconsax-reactjs";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

type EditorProps = {
    title: string;
    value: Record<string, string | number>;
    onChange: (next: Record<string, string | number>) => void;
};
export default function KeyValuePairEditor({
    title,
    value = {},
    onChange,
}: EditorProps) {
    const entries = Object.entries(value);

    const updateKey = (idx: number, newKey: string) => {
        const next = Object.entries(value);
        next[idx] = [newKey, next[idx][1]];
        onChange(Object.fromEntries(next));
    };

    const updateValue = (idx: number, newValue: string) => {
        const next = Object.entries(value);
        next[idx] = [next[idx][0], newValue];
        onChange(Object.fromEntries(next));
    };

    const removeEntry = (idx: number) => {
        const next = Object.entries(value);
        next.splice(idx, 1);
        onChange(Object.fromEntries(next));
    };

    const addEntry = () => {
        let newKey = "Field";
        let i = 1;
        while (value[newKey] !== undefined) newKey = `Field ${i++}`;
        onChange({ ...value, [newKey]: "" });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] text-gold md:text-[11px] xl:text-xs uppercase tracking-wider">
                    {title}
                </span>
                <Button
                    className="flex items-center gap-x-2 text-[10px] md:text-[11px] xl:text-xs"
                    onClick={addEntry}
                >
                    <AddSquare className="size-3 md:size-3.5 xl:size-4" /> Add Field
                </Button>
            </div>
            {entries.length === 0 && (
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm italic">
                    No fields added yet.
                </p>
            )}
            {entries.map(([key, val], idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <>
                <div key={`key_value-${idx}`} className="flex items-center gap-2 mb-2">
                    <Input
                        type="text"
                        value={key}
                        onChange={(e) => updateKey(idx, e.target.value)}
                        placeholder="Key"
                    />
                    <Input
                        type="text"
                        value={val}
                        onChange={(e) => updateValue(idx, e.target.value)}
                        placeholder="Value"
                    />
                    <Button variant="outline" onClick={() => removeEntry(idx)} className="hover:text-destructive">
                        <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
