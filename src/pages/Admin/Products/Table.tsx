import { Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { useDeleteProduct } from "#/services/mutations";
import { formatDate } from "#/utils/format";

const Table = ({ products }: { products: Products[] }) => {

    const [deleting, setDeleting] = useState<string>("");
    const reset = () => setDeleting("");

    const classColors: Record<string, string> = {
        A: "hsl(36 55% 50%)",
        B: "hsl(36 40% 40%)",
        C: "oklch(0.62 0.22 25)",
        D: "hsl(215 18% 40%)",
        E: "oklch(0.584 0.121 166)",
    };

    const deleteProduct = useDeleteProduct();
    const handleDeletion = (id: string) => {
        setDeleting(id);
        const proceed = confirm("Do you wish to delete this Product?");
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteProduct.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("Product was Deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to Delete Product, Please Try Again.";
                    toast.error(message);
                    reset();
                },
            },
        );
    };

    return (
        <main className="bg-card border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/30 border-border/50 border-b">
                            {["Product Name", "Class", "Date", "Actions"].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 font-bold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-left uppercase"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-12 text-muted-foreground text-center"
                                >
                                    No Products added yet.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-muted/10 *:px-4 *:py-3 border-border/30 border-b *:text-[11px] md:*:text-xs xl:*:text-sm text-nowrap transition-colors"
                                >
                                    {/* Product Name */}
                                    <td className="flex items-center gap-x-2 font-medium">
                                        <span
                                            className="rounded-full size-2 shrink-0"
                                            style={{
                                                backgroundColor:
                                                    classColors[product.class.toUpperCase()] ||
                                                    classColors.A,
                                            }}
                                        />
                                        {product.name}
                                    </td>

                                    {/* Product Class */}
                                    <td>
                                        <span
                                            style={{
                                                color:
                                                    classColors[product.class.toUpperCase()] ||
                                                    classColors.A,
                                            }}
                                        >
                                            {product.class}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="text-muted-foreground">
                                        {formatDate(product.createdAt)}
                                    </td>

                                    {/* Actions */}
                                    <td className="cursor-pointer">
                                        {deleting === product.id ? (
                                            <Loader className="size-4 md:size-4.5 xl:size-5 text-accent animate-spin" />
                                        ) : (
                                            <Trash
                                                onClick={() => handleDeletion(product.id)}
                                                className="size-4 md:size-4.5 xl:size-5 text-destructive hover:text-destructive/80"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Table;
