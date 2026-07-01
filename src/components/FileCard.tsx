import { DocumentText, DocumentText1, Gallery, ImportCurve, Link } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

const FileCard = ({
    url,
    fileName = "document",
    label,
}: {
    url: string;
    fileName: string;
    label: string;
}) => {
    const [downloading, setDownloading] = useState<boolean>(false);
    const [fileType, setFileType] = useState<string | null>(null);

    const detectType = () => {
        if (fileType) return fileType;
        // Try to infer from URL; fall back to "unknown" — download still works
        const lower = (url || "").toLowerCase();
        if (lower.includes(".pdf") || lower.includes("pdf")) return "pdf";
        if (lower.match(/\.(jpg|jpeg|png|gif|webp|svg)/) || lower.includes("image"))
            return "image";
        return "unknown";
    };

    const type = detectType();
    const Icon =
        type === "pdf" ? DocumentText : type === "image" ? Gallery : DocumentText1;

    // Functions
    const handleOpen = () => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const ext = blob.type.includes("pdf")
                ? "pdf"
                : blob.type.includes("png")
                    ? "png"
                    : blob.type.includes("jpeg") || blob.type.includes("jpg")
                        ? "jpg"
                        : blob.type.includes("gif")
                            ? "gif"
                            : blob.type.includes("webp")
                                ? "webp"
                                : "bin";
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `${fileName}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            setFileType(blob.type.includes("pdf") ? "pdf" : "image");
        } catch {
            // Fallback: open in new tab if fetch fails (e.g. CORS)
            window.open(url, "_blank", "noopener,noreferrer");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <main className="flex items-center gap-3 p-4 border border-border">
            <section className="flex justify-center items-center bg-gold/10 border border-gold/20 size-8 md:size-9 xl:size-10 shrink-0">
                <Icon variant="Bold" className="size-4 md:size-4.5 xl:size-5 text-gold" />
            </section>

            <section className="flex-1 min-w-0">
                <p className="text-[11px] md:text-xs xl:text-sm truncate">{label || fileName}</p>
                <p className="mt-0.5 font-mono text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                    {type === "pdf"
                        ? "PDF Document"
                        : type === "image"
                            ? "Image File"
                            : "File"}
                </p>
            </section>

            <div className="flex items-center gap-2 shrink-0">
                <Button onClick={handleOpen} variant="secondary">
                    <Link className="size-3 md:size-3.5 xl:size-4" />
                    <span className="hidden sm:inline">Open</span>
                </Button>
                <Button onClick={handleDownload} disabled={downloading}>
                    {downloading ? (
                        <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                    ) : (
                        <ImportCurve className="size-4 md:size-4.5 xl:size-5" />
                    )}
                    <span className="hidden sm:inline">
                        {downloading ? "..." : "Download"}
                    </span>
                </Button>
            </div>
        </main>
    );
};

export default FileCard;
