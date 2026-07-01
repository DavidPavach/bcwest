import { DocumentText1, GalleryImport, Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import { UrlQrCode } from "#/components/Invoice";
import { Button } from "#/components/ui/button";
import { useDeleteDocument } from "#/services/mutations";
import { formatDate } from "#/utils/format";
import { downloadAsImage } from "#/utils/generate";

const Table = ({ documents }: { documents: Documents[] }) => {
    const [downloading, setDownloading] = useState<string>("");
    const [deleting, setDeleting] = useState<string>("");
    const reset = () => setDeleting("");

    const deleteTerminal = useDeleteDocument();

    const handleDeletion = (id: string) => {
        setDeleting(id);
        const proceed = confirm(
            "Do you wish to delete this Verification Document?",
        );
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteTerminal.mutate(
            { data: { id } },
            {
                onSuccess: () => {
                    toast.success("Verification Document was deleted successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message ||
                        "Failed to delete Verification Document, Please Try Again.";
                    toast.error(message);
                    reset();
                },
            },
        );
    };

    const docRef = useRef<HTMLDivElement | null>(null);

    const handleDownloadImage = async () => {
        toast.info("Downloading Image...");

        if (!docRef.current) return;
        setDownloading("image");
        try {
            await downloadAsImage(docRef.current, "DOCS-QR-CODE");
        } finally {
            setDownloading("");
        }
    };

    return (
        <main>
            {documents.length === 0 ? (
                <section className="py-12 text-muted-foreground text-center">
                    <p> No Verification Documents added yet.</p>
                </section>
            ) : (
                <section className="flex gap-5">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-card bg-red p-4 text-[11px] text-card-foreground md:text-xs xl:text-sm"
                        >
                            <div className="flex justify-between items-center">
                                <div className="bg-muted px-2 py-1 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
                                    {formatDate(doc.createdAt, "short")}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeletion(doc.id)}
                                    className="bg-destructive/20 hover:bg-destructive/30 p-1 border border-destructive/10 text-destructive/70 hover:text-destructive cursor-pointer"
                                >
                                    {deleting ? (
                                        <Loader className="size-3 md:size-3.5 xl:size-4" />
                                    ) : (
                                        <Trash className="size-3 md:size-3.5 xl:size-4" />
                                    )}
                                </button>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Document Number: </h3>
                                <p>{doc.documentNumber}</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-x-2">
                                    {doc.images.map((image) => (
                                        <a
                                            key={image}
                                            href={image}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <DocumentText1
                                                className="size-6 md:size-6.5 xl:size-7 text-muted-foreground"
                                                variant="Bold"
                                            />
                                        </a>
                                    ))}
                                </div>
                                <p className="mb-4 text-[10px] text-primary md:text-[11px] xl:text-xs">
                                    Click to open in a new tab
                                </p>
                                <div ref={docRef} className="h-20">
                                    <UrlQrCode url={`https://bcwestterminal.ca/verification?verify=docs&number=${doc.documentNumber}`} />
                                </div>
                                <div>
                                    <Button onClick={handleDownloadImage} className="w-full">
                                        {downloading === "image" ? (
                                            <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                                        ) : (
                                            <GalleryImport className="size-4 md:size-4.5 xl:size-5" />
                                        )}
                                        Download QR Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
};

export default Table;
