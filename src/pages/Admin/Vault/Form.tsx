import { CloseSquare, DocumentText, Gallery } from "iconsax-reactjs";
import { Loader, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import { Button } from "#/components/ui/button";
import { useAddToRegistry, useFileUpload } from "#/services/mutations";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
];

const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.webp,.gif,.svg";

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const isImage = (type: string) => type.startsWith("image/");

const DocumentUploadForm = ({ onClose }: { onClose: () => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const resetInput = () => {
        if (inputRef.current) inputRef.current.value = "";
    };

    const clearPreview = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    const handleFile = (selectedFile: File | undefined) => {
        if (!selectedFile) {
            setFile(null);
            clearPreview();
            setError("");
            return;
        }

        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setError("Only PDF and image files are allowed.");
            setFile(null);
            clearPreview();
            resetInput();
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("File size must not exceed 50MB.");
            setFile(null);
            clearPreview();
            resetInput();
            return;
        }

        setError("");
        setFile(selectedFile);

        if (isImage(selectedFile.type)) {
            clearPreview();
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            clearPreview();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
    };

    const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleRemove = () => {
        setFile(null);
        clearPreview();
        setError("");
        resetInput();
    };

    const uploadFile = useFileUpload();
    const addFile = useAddToRegistry()
    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please select a file to submit.");
            return;
        }

        try {
            // Upload to storage
            const uploadResult = await uploadFile.mutateAsync(file);

            if (!uploadResult?.fileUrl || !uploadResult?.fileId) {
                return toast.error(
                    "Upload completed but the server returned an invalid response."
                );
            }

            const payload = {
                fileId: uploadResult.fileId,
                url: uploadResult.fileUrl,
                name: file.name,
            };

            // Save metadata
            await addFile.mutateAsync({
                data: payload,
            });

            toast.success("File added successfully.");
            setFile(null);
            onClose();
        } catch (error) {
            console.error("File submission failed:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again.";

            toast.error(message);
        }
    };

    return (
        <main className="bg-card mx-auto p-4 md:p-6 xl:p-8 border border-border w-full max-w-xl text-card-foreground">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="font-semibold text-sm md:text-base xl:text-lg">
                        Supporting Document
                    </h2>
                    <p className="mt-1 text-[11px] md:text-xs xl:text-sm">
                        Upload a PDF or image to attach to your request.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="hover:bg-destructive/10 p-1.5 rounded-full text-muted-foreground hover:text-destructive transition cursor-pointer"
                    aria-label="Close"
                >
                    <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                </button>
            </div>

            {/* Dropzone / file input */}
            <button
                type="button"
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`group flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-4 md:px-6 xl:px-8 py-10 w-full text-center transition ${isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/10"
                    }`}
            >
                <UploadCloud className="mb-3 size-8 md:size-9 xl:size-10 text-muted-foreground group-hover:text-primary transition" />
                <p className="font-medium text-[11px] text-muted md:text-xs xl:text-sm">
                    Drag & drop a file here, or click to browse
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                    PDF, JPG, PNG, WEBP, GIF, SVG — up to 50MB
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED_EXTENSIONS}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </button>

            {/* Helper text */}
            <p className="mt-3 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
                Accepted formats: PDF, JPG, PNG, WEBP, GIF, SVG. Maximum file size:
                50MB. Video files are not accepted.
            </p>

            {/* Error */}
            {error && (
                <p className="bg-destructive/10 mt-4 px-3 py-2 rounded-md text-[11px] text-destructive md:text-xs xl:text-sm">
                    {error}
                </p>
            )}

            {/* Selected file preview */}
            {file && (
                <div className="mt-6 border border-border overflow-hidden">
                    {previewUrl ? (
                        <div className="relative">
                            <img
                                src={previewUrl}
                                alt={file.name}
                                className="mx-auto w-full max-h-64 object-contain"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="top-2 right-2 absolute bg-destructive/10 p-1.5 rounded-full text-muted-foreground hover:text-destructive transition cursor-pointer"
                                aria-label="Remove file"
                            >
                                <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 px-4 py-4">
                            <div className="flex justify-center items-center bg-destructive/10 rounded-lg w-10 h-10 text-destructive shrink-0">
                                <DocumentText className="size-4 md:size-4.5 xl:size-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-[11px] md:text-xs xl:text-sm truncate">
                                    {file.name}
                                </p>
                                <p className="text-[10px] md:text-[11px] xl:text-xs">
                                    PDF document
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="hover:bg-destructive/10 p-1.5 rounded-full text-muted-foreground hover:text-destructive transition cursor-pointer"
                                aria-label="Remove file"
                            >
                                <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                            </button>
                        </div>
                    )}

                    <div className="gap-px grid grid-cols-3 text-[11px] md:text-xs xl:text-sm">
                        <div className="px-4 py-3">
                            <p className="text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
                                Name
                            </p>
                            <p className="mt-0.5 text-muted-foreground truncate">
                                {file.name}
                            </p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
                                Size
                            </p>
                            <p className="mt-0.5 text-muted-foreground">
                                {formatFileSize(file.size)}
                            </p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
                                Type
                            </p>
                            <p className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                                {isImage(file.type) ? (
                                    <Gallery className="size-3 md:size-3.5 xl:size-4" />
                                ) : (
                                    <DocumentText className="size-3 md:size-3.5 xl:size-4" />
                                )}
                                {file.type}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end items-center gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-destructive/10 hover:bg-destructive px-4 py-2 font-medium text-[11px] md:text-xs xl:text-sm transition cursor-pointer"
                >
                    Close
                </button>
                <Button onClick={handleSubmit} disabled={!file || uploadFile.isPending || addFile.isPending}>
                    {addFile.isPending || uploadFile.isPending ?
                        <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                        : "Submit"
                    }
                </Button>
            </div>
        </main>
    );
};

export default DocumentUploadForm;
