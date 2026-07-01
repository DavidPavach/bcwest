import { Edit, Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { useDeleteInvoice } from "#/services/mutations";

const Table = ({
    invoices,
    onEdit,
}: {
    invoices: Invoice[];
    onEdit: (t: Invoice) => void;
}) => {
    const [deleting, setDeleting] = useState<string>("");
    const reset = () => setDeleting("");

    const deleteInvoice = useDeleteInvoice();
    const handleDeletion = (id: string) => {
        setDeleting(id);
        const proceed = confirm("Do you wish to delete this Invoice?");
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteInvoice.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("Invoice was Deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to Delete Invoice, Please Try Again.";
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
                            {[
                                "Invoice Number",
                                "Issued Date",
                                "Due Date",
                                "Currency",
                                "Actions",
                            ].map((header) => (
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
                        {invoices.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-12 text-muted-foreground text-center"
                                >
                                    No Invoice added yet.
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="hover:bg-muted/10 *:px-4 *:py-3 border-border/30 border-b *:text-[11px] md:*:text-xs xl:*:text-sm text-nowrap transition-colors"
                                >
                                    {/* Invoice Number */}
                                    <td>{invoice.invoiceNumber}</td>

                                    {/* Issue Date */}
                                    <td>{invoice.issueDate}</td>

                                    {/* Due Date */}
                                    <td>{invoice.dueDate}</td>

                                    {/* Currency */}
                                    <td>{invoice.currency}</td>

                                    {/* Action */}
                                    <td>
                                        <div className="flex items-center gap-x-7">
                                            <Edit
                                                onClick={() => onEdit(invoice)}
                                                className="size-4 md:size-4.5 xl:size-5 text-accent cursor-pointer"
                                            />
                                            {deleting === invoice.id ? (
                                                <Loader className="size-4 md:size-4.5 xl:size-5 text-accent animate-spin" />
                                            ) : (
                                                <Trash
                                                    onClick={() => handleDeletion(invoice.id)}
                                                    className="size-4 md:size-4.5 xl:size-5 text-destructive hover:text-destructive/80 cursor-pointer"
                                                />
                                            )}
                                        </div>
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
