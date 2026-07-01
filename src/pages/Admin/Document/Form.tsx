import { DocumentText1 } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateDocument } from "#/services/mutations";
import { useAllImages } from "#/services/queries";
import { isImage } from "#/utils/format";

const Form = () => {
    const [newNumber, setNewNumber] = useState<string>("");
    const [docs, setDocs] = useState<string[]>([]);

    const newDocs = useCreateDocument();
    const { data, isLoading, isError, refetch } = useAllImages();
    const registryFiles: RegistryFile[] = data?.rows || [];

    if (isLoading) return <AdminLoader />;

    if (isError)
        return (
            <AdminError
                message="Failed to Load your Image and Document Registry, Kindly press the button to reload."
                onRetry={refetch}
            />
        );

    // Functions
    const toggleDocument = (url: string) => {
        setDocs((prev) =>
            prev.includes(url) ? prev.filter((doc) => doc !== url) : [...prev, url],
        );
    };

    const reset = () => {
        setNewNumber("");
        setDocs([]);
    };

    const disabled =
        !newNumber.trim() || newNumber.trim().length < 10 || docs.length === 0;
    const handleSubmit = () => {
        if (disabled) return toast.warning("Kindly Check The Entered Details");

        const payload = {
            documentNumber: newNumber,
            images: docs,
        };
        newDocs.mutate(
            { data: payload },
            {
                onSuccess: () => {
                    toast.success("Verification Documents ware added successfully");
                    reset();
                },
                onError: (error) => {
                    const message =
                        error.message || "Failed to add Verification Documents, Try Again.";
                    toast.error(message);
                },
            },
        );
    };

    return (
        <main className="bg-card p-4 text-card-foreground">
            <header className="font-mono text-[11px] text-accent md:text-xs xl:text-sm">
                Create New Document
            </header>
            <section className="flex md:flex-row flex-col md:justify-between gap-y-5 md:gap-y-0 mt-8">
                <div className="w-full md:w-[30%]">
                    <div className="space-y-2">
                        <Label htmlFor="newNumber">Document Number</Label>
                        <Input
                            id="newNumber"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                            placeholder="Eg: BCWEST-DOCS-001"
                        />
                        {newNumber.trim() && newNumber.length < 10 && (
                            <p className="text-[10px] text-destructive md:text-[11px] xl:text-xs">
                                Please ensure the ID contains up to 10 values.
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-[68%]">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <p className="font-mono text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">
                                Registry Files
                            </p>

                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                Click files to attach or remove them.
                            </p>
                        </div>

                        <span className="font-heading text-accent text-sm md:text-base xl:text-lg">
                            {docs.length} Selected
                        </span>
                    </div>

                    <main className="gap-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {registryFiles.map((file) => {
                            const selected = docs.includes(file.url);
                            return (
                                <button
                                    key={file.id}
                                    type="button"
                                    onClick={() => toggleDocument(file.url)}
                                    className={`cursor-pointer group overflow-hidden border bg-card text-left transition-all duration-200 hover:border-accent/60 hover:bg-muted/1 ${selected
                                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                                        : "border-border/50"
                                        } `}
                                >
                                    <div className="flex justify-center items-center bg-muted/20 h-24 overflow-hidden">
                                        {isImage(file.name) ? (
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        ) : (
                                            <DocumentText1 className="size-8 text-muted-foreground" />
                                        )}
                                    </div>

                                    <div className="space-y-1 p-3">
                                        <p
                                            className="font-medium text-[10px] md:text-[11px] xl:text-xs truncate"
                                            title={file.name}
                                        >
                                            {file.name}
                                        </p>
                                        {selected && (
                                            <p className="font-mono text-[8px] text-accent md:text-[9px] xl:text-[10px] uppercase tracking-wide">
                                                Selected
                                            </p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </main>
                </div>
            </section>
            {/* Summary */}
            <section className="space-y-5 mt-8">
                <p className="font-mono text-[11px] text-accent md:text-xs xl:text-sm">
                    Summary
                </p>
                <div className="space-y-1">
                    <p className="text-[10px] text-fog md:text-[11px] xl:text-xs">
                        Document ID
                    </p>
                    <p>{newNumber}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-fog md:text-[11px] xl:text-xs">
                        Documents and Images
                    </p>
                    {docs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {docs.map((url) => {
                                const file = registryFiles.find((f) => f.url === url);
                                return (
                                    <div
                                        key={url}
                                        className="bg-accent/10 px-2 py-1 border border-accent/40 text-xs"
                                    >
                                        {file?.name}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <Button
                onClick={handleSubmit}
                disabled={disabled || newDocs.isPending}
                className="mt-8 w-full"
            >
                {newDocs.isPending ? (
                    <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                ) : (
                    "Submit"
                )}
            </Button>
        </main>
    );
};

export default Form;
