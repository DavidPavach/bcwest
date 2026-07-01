import { Edit, Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { useDeleteTSR } from "#/services/mutations";
import { formatDate } from "#/utils/format";

const Table = ({ tsrs, onEdit }: { tsrs: TSR[]; onEdit: (t: TSR) => void }) => {
    const [deleting, setDeleting] = useState<string>("");
    const reset = () => setDeleting("");

    const deleteTsr = useDeleteTSR();
    const handleDeletion = (id: string) => {
        setDeleting(id);
        const proceed = confirm("Do you wish to delete this TSR?");
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteTsr.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("TSR was Deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to Delete TSR, Please Try Again.";
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
                            {["TSR Number", "Issued Date", "Currency", "Actions"].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-3 font-bold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-left uppercase"
                                    >
                                        {header}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {tsrs.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-12 text-muted-foreground text-center"
                                >
                                    No TSR added yet.
                                </td>
                            </tr>
                        ) : (
                            tsrs.map((t) => (
                                <tr
                                    key={t.id}
                                    className="hover:bg-muted/10 *:px-4 *:py-3 border-border/30 border-b *:text-[11px] md:*:text-xs xl:*:text-sm text-nowrap transition-colors"
                                >
                                    {/* TSR Number */}
                                    <td>{t.tsrNumber}</td>

                                    {/* Issued Date */}
                                    <td>{formatDate(t.issuedDate)}</td>

                                    {/* Currency */}
                                    <td>{t.currency}</td>

                                    {/* Action */}
                                    <td>
                                        <div className="flex items-center gap-x-7">
                                            <Edit
                                                onClick={() => onEdit(t)}
                                                className="size-4 md:size-4.5 xl:size-5 text-accent cursor-pointer"
                                            />
                                            {deleting === t.id ? (
                                                <Loader className="size-4 md:size-4.5 xl:size-5 text-accent animate-spin" />
                                            ) : (
                                                <Trash
                                                    onClick={() => handleDeletion(t.id)}
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
