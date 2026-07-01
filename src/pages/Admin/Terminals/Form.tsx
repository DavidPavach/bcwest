import { ToggleOff, ToggleOn } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";
import { useCreateTerminal } from "#/services/mutations";

type FormType = {
    name: string;
    active: boolean;
    rateA: number;
    rateB: number;
    rateC: number;
    rateD: number;
    rateE: number;
    country: string;
};

const defaultValue: FormType = {
    name: "",
    active: true,
    country: "",
    rateA: 0,
    rateB: 0,
    rateC: 0,
    rateD: 0,
    rateE: 0,
};

const isFormComplete = (f: FormType) => {
    const stringOk = f.name.trim() !== "" && f.country.trim() !== "";
    const numbersOk = [f.rateA, f.rateB, f.rateC, f.rateD, f.rateE].every(
        (n) => n !== 0,
    );
    return stringOk && numbersOk;
};

const Form = () => {
    const [form, setForm] = useState<FormType>(defaultValue);

    const handleChange = (
        key: keyof FormType,
        value: string | number | boolean,
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const reset = () => {
        setForm(defaultValue);
    };

    const createTerminal = useCreateTerminal();
    const canSubmit = isFormComplete(form);
    const handleSubmit = () => {
        if (!canSubmit)
            return toast.error("Kindly fill all parts of the form to continue");

        createTerminal.mutate(
            { data: form },
            {
                onSuccess: () => {
                    toast.success("Terminal was added successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to add Terminal, Please Try Again.";
                    toast.error(message);
                },
            },
        );
    };

    return (
        <main className="space-y-5">
            {/* Terminal Details */}
            <section className="flex md:flex-row flex-col md:justify-between md:items-center gap-y-5 md:gap-y-0">
                <div className="space-y-2 w-full md:w-[49%]">
                    <Label htmlFor="name">Terminal Name</Label>
                    <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Vancouver"
                    />
                </div>

                <div className="space-y-2 w-full md:w-[49%]">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        id="country"
                        value={form.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        placeholder="Canada"
                    />
                </div>
            </section>

            {/* Status */}
            <button
                onClick={() => handleChange("active", !form.active)}
                type="button"
                className={`w-full cursor-pointer border p-2 md:p-3 xl:p-4 text-[11px] md:text-xs xl:text-sm flex items-center justify-between ${form.active ? "border-accent" : "border-border"
                    }`}
            >
                <div className="text-left">
                    <p className="font-mono">Operational Status</p>
                    <p className={cn(form.active ? "text-accent/60" : "", "mt-1")}>
                        Active terminals are available for logistics routing.
                    </p>
                </div>

                {form.active ? (
                    <ToggleOn variant="Bold" size={26} className="text-accent" />
                ) : (
                    <ToggleOff variant="Bold" size={26} />
                )}
            </button>

            {/* Rates */}
            <section className="space-y-4">
                <div>
                    <h3 className="font-mono uppercase">Terminal Rates</h3>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Configure pricing rates for this terminal (USD).
                    </p>
                </div>

                <div className="gap-4 grid grid-cols-2">
                    {(["rateA", "rateB", "rateC", "rateD", "rateE"] as const).map(
                        (rate) => (
                            <div key={rate} className="space-y-2">
                                <Label htmlFor={rate}>{rate.replace("rate", "Rate ")}</Label>

                                <Input
                                    id={rate}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={form[rate]}
                                    onChange={(e) =>
                                        handleChange(rate, Number(e.target.value) || 0)
                                    }
                                    placeholder="0.00"
                                />
                            </div>
                        ),
                    )}
                </div>
            </section>

            {/* Submit */}
            <div className="flex justify-end pt-2">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={createTerminal.isPending || !canSubmit}
                >
                    {createTerminal.isPending ? (
                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                    ) : (
                        "Create Terminal"
                    )}
                </Button>
            </div>
        </main>
    );
};

export default Form;
