import { Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { useDeleteTerminal } from "#/services/mutations";

const Table = ({ terminals }: { terminals: Terminals[] }) => {

    const [deleting, setDeleting] = useState<string>("");
    const reset = () => setDeleting("");

    const deleteTerminal = useDeleteTerminal();
    const handleDeletion = (id: string) => {
        setDeleting(id);
        const proceed = confirm("Do you wish to delete this Terminal?");
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteTerminal.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("Terminal was deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to delete Terminal, Please Try Again.";
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
                                "Name",
                                "Country",
                                "Status",
                                "Storage Rate (A-E)",
                                "Actions",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 font-mono font-bold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-left uppercase"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {terminals.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-12 text-muted-foreground text-center"
                                >
                                    No Terminals added yet.
                                </td>
                            </tr>
                        ) : (
                            terminals.map((terminal) => (
                                <tr
                                    key={terminal.id}
                                    className="hover:bg-muted/10 *:px-4 *:py-3 border-border/30 border-b *:text-[11px] md:*:text-xs xl:*:text-sm text-nowrap transition-colors"
                                >
                                    {/* Terminal Name */}
                                    <td className="flex items-center gap-x-2 font-medium">
                                        {terminal.name}
                                    </td>

                                    {/* Terminal Class */}
                                    <td>{terminal.country}</td>

                                    {/* Status */}
                                    <td>
                                        {terminal.active ?
                                            <div className="bg-green-500 px-3 py-1.5 w-fit font-mono">ACTIVE</div>
                                            : <div className="bg-destructive px-3 py-1.5 w-fit font-mono">INACTIVE</div>
                                        }
                                    </td>

                                    {/* Rates */}
                                    <td className="flex gap-x-2">
                                        {(
                                            [
                                                terminal.rateA,
                                                terminal.rateB,
                                                terminal.rateC,
                                                terminal.rateD,
                                                terminal.rateE,
                                            ] as const
                                        ).map((rate) => (
                                            <div key={`${terminal.id} ${rate}`} className="px-2 py-1 border border-gold">
                                                {rate}
                                            </div>
                                        ))}
                                    </td>

                                    {/* Actions */}
                                    <td className="cursor-pointer">
                                        {deleting === terminal.id ? (
                                            <Loader className="size-4 md:size-4.5 xl:size-5 text-accent animate-spin" />
                                        ) : (
                                            <Trash
                                                onClick={() => handleDeletion(terminal.id)}
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
