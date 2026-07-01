import { ArrowDown3, Box } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateProduct } from "#/services/mutations";
import { useAllProducts } from "#/services/queries";
import Table from "./Table";

const index = () => {
    const { data, isLoading, isError, refetch } = useAllProducts();
    const createProduct = useCreateProduct();

    const products: Products[] = data?.rows || []

    // States
    const [name, setName] = useState<string>("");
    const [classification, setClassification] = useState<string>("");

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Products, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Functions
    const reset = () => {
        setName("");
        setClassification("");
    };

    const handleSave = () => {
        const payload = {
            name,
            class: classification,
        };
        createProduct.mutate(
            { data: payload },
            {
                onSuccess: () => {
                    toast.success("Product was created successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to create Product, Please Try Again.";
                    toast.error(message);
                },
            },
        );
    };

    return (
        <main>
            <header className="mb-8">
                <h1 className="font-heading font-black text-xl md:text-2xl xl:text-3xl">
                    Products Catalog
                </h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Manage industrial assets and equipment classifications for Terminal.
                </p>
            </header>
            <section className="flex sm:flex-row flex-col sm:justify-between gap-y-5 sm:gap-y-0">
                <main className="bg-card p-4 w-full sm:w-[38%] text-card-foreground">
                    <header className="flex items-center gap-2">
                        <Box className="size-3 md:size-3.5 xl:size-4 text-accent" />
                        <span className="font-mono text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wider">
                            New Product Entry
                        </span>
                    </header>
                    <section className="space-y-4 mt-8">
                        <div>
                            <Label
                                htmlFor="name"
                                className="mb-1.5 font-mono text-[10px] md:text-[11px] xl:text-xs uppercase"
                            >
                                Product Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Liquid Nitrogen Tank"
                            />
                        </div>
                        <div>
                            <Label className="block mb-1.5 font-mono text-[10px] md:text-[11px] xl:text-xs uppercase">
                                Classification
                            </Label>
                            <div className="relative">
                                <select
                                    value={classification}
                                    onChange={(e) => setClassification(e.target.value)}
                                    className={`px-3 py-2.5 border border-border focus:outline-none focus:border-primary w-full appearance-none`}
                                    style={{
                                        color: classification
                                            ? "hsl(40 20% 90%)"
                                            : "hsl(215 12% 45%)",
                                        border: "1px solid hsl(220 12% 22%)",
                                    }}
                                >
                                    <option value="">Select Class</option>
                                    <option value="A">Class A</option>
                                    <option value="B">Class B</option>
                                    <option value="C">Class C</option>
                                    <option value="D">Class D</option>
                                    <option value="E">Class E</option>
                                </select>
                                <ArrowDown3 className="top-1/2 right-3 absolute size-3 md:size-3.5 xl:size-4 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={createProduct.isPending || !name || !classification}
                            className="mt-4 w-full"
                        >
                            <Box className="size-3 md:size-3.5 xl:size-4" />
                            {createProduct.isPending ? "Saving..." : "Save Product"}
                        </Button>
                    </section>
                </main>
                <div className="bg-card p-4 w-full sm:w-[60%]">
                    <header className="flex justify-between items-center mb-4 pb-2 border-border border-b font-mono text-[11px] md:text-xs xl:text-sm tracking-wider">
                        <p className="font-semibold text-muted-foreground">ACTIVE INVENTORY</p>
                        <p className="text-accent">{data?.total || 0} PRODUCTS LOADED</p>
                    </header>
                    <Table products={products} />
                </div>
            </section>
        </main>
    );
};

export default index;
