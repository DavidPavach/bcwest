import { Copy, DocumentText1, Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import { useRemoveFromRegistry } from "#/services/mutations";
import { formatDate, isImage } from "#/utils/format";
import { copyToClipboard } from "#/utils/generate";

const Table = ({ files }: { files: RegistryFile[] }) => {

    const [deleting, setDeleting] = useState<string>("");

    // Functions
    const reset = () => setDeleting("");

    const deleteFile = useRemoveFromRegistry();
    const onDelete = (id: string) => {
        setDeleting(id);
        const proceed = confirm("Do you wish to delete this File");
        if (!proceed) return toast.error("File Deletion was Cancelled");

        deleteFile.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("File was Deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to Delete File, Please Try Again.";
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
                            {["Preview", "Filename", "Upload Date", "Actions"].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-3 font-bold text-muted-foreground text-xs text-left uppercase"
                                    >
                                        {header}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {files.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-12 text-muted-foreground text-center"
                                >
                                    No files uploaded yet.
                                </td>
                            </tr>
                        ) : (
                            files.map((file) => (
                                <tr
                                    key={file.id}
                                    className="hover:bg-muted/10 *:px-4 *:py-3 border-border/30 border-b *:text-[11px] md:*:text-xs xl:*:text-sm text-nowrap transition-colors"
                                >
                                    {/* Preview */}
                                    <td>
                                        <div className="flex justify-center items-center bg-muted/20 border border-border/50 w-14 h-12 overflow-hidden">
                                            {isImage(file.name) ? (
                                                <img
                                                    src={file.url}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <DocumentText1 className="size-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </td>

                                    {/* Filename */}
                                    <td>
                                        <div className="flex gap-x-2">
                                            <p className="font-medium">{file.name}</p>
                                            <Copy onClick={() => copyToClipboard(file.url)} className="size-4 md:size-4.5 xl:size-5 cursor-pointer" />
                                        </div>
                                    </td>

                                    {/* Upload Date */}
                                    <td className="text-muted-foreground">
                                        {formatDate(file.createdAt)}
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <button
                                            disabled={deleteFile.isPending}
                                            type="button"
                                            onClick={() => onDelete(file.id)}
                                            className="inline-flex items-center gap-2 hover:bg-destructive/10 px-4 py-2 border border-destructive/40 font-semibold text-destructive text-xs uppercase tracking-wide transition-colors cursor-pointer"
                                        >
                                            {deleting === file.id ? (
                                                <>
                                                    <Loader className="size-3 md:size-3.5 xl:size-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash className="size-3 md:size-3.5 xl:size-4" />
                                                    Delete Permanently
                                                </>
                                            )}
                                        </button>
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
