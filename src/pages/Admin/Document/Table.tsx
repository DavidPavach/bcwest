import { DocumentText1, GalleryImport, Trash } from "iconsax-reactjs";
import { ChevronDown, ExternalLink, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";

import { UrlQrCode } from "#/components/Invoice";
import { Button } from "#/components/ui/button";
import { useDeleteDocument } from "#/services/mutations";
import { formatDate } from "#/utils/format";
import { downloadAsImage } from "#/utils/generate";

type DocumentCardProps = {
	doc: Documents;
	isDownloading: boolean;
	isDeleting: boolean;
	isDisabled: boolean;
	onDownload: (doc: Documents, qrElement: HTMLElement | null) => Promise<void>;
	onDelete: (id: string) => void;
};

const getVerificationUrl = (documentNumber: string): string => {
	const url = new URL("https://bcwestterminal.ca/verification");
	url.searchParams.set("verify", "docs");
	url.searchParams.set("value", documentNumber);
	return url.toString();
};

// Collapsible section component for reusability
const CollapsibleSection = ({
	title,
	defaultOpen = false,
	children,
}: {
	title: string;
	defaultOpen?: boolean;
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="border-t border-border">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between cursor-pointer gap-2 px-5 py-3 transition-colors hover:bg-muted/30 active:bg-muted/50"
				aria-expanded={isOpen}
			>
				<h4 className="text-sm font-semibold">{title}</h4>
				<ChevronDown
					className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="border-t border-border/50 bg-muted/20 px-5 py-3">
					{children}
				</div>
			)}
		</div>
	);
};

const DocumentCard = ({
	doc,
	isDownloading,
	isDeleting,
	isDisabled,
	onDownload,
	onDelete,
}: DocumentCardProps) => {
	const qrRef = useRef<HTMLDivElement | null>(null);

	return (
		<article className="flex flex-col overflow-hidden border border-border bg-card text-card-foreground h-fit">
			{/* Compact Header with Document Info */}
			<header className="flex items-start justify-between gap-3 bg-muted/30 px-4 py-3">
				<div className="min-w-0 flex-1">
					<p className="no-break font-mono text-xs font-semibold tracking-wide">
						{doc.documentNumber}
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{formatDate(doc.createdAt, "short")}
					</p>
				</div>

				<button
					type="button"
					onClick={() => onDelete(doc.id)}
					disabled={isDisabled}
					aria-label={`Delete document ${doc.documentNumber}`}
					className="inline-flex size-7 shrink-0 items-center justify-center cursor-pointer rounded-lg border border-destructive/20 text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isDeleting ? (
						<Loader className="size-3.5 animate-spin" />
					) : (
						<Trash size={16} />
					)}
				</button>
			</header>

			{/* Collapsible Sections */}
			<div className="flex flex-1 flex-col overflow-hidden text-sm">
				{/* Attachments Section */}
				<CollapsibleSection title={`Attachments (${doc.images.length})`}>
					{doc.images.length > 0 ? (
						<div className="space-y-2">
							{doc.images.map((file, index) => (
								<a
									// biome-ignore lint/suspicious/noArrayIndexKey: <>
									key={`${file}-${index}`}
									href={file}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Open attachment ${index + 1}`}
									className="flex items-center gap-2 rounded-lg border border-border/50 bg-background p-2 transition-colors hover:bg-muted/30"
								>
									<div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
										<DocumentText1 size={16} variant="Bulk" />
									</div>
									<span className="truncate text-xs font-medium flex-1">
										Attachment {index + 1}
									</span>
									<ExternalLink className="size-3 shrink-0 text-muted-foreground" />
								</a>
							))}
						</div>
					) : (
						<p className="text-xs text-muted-foreground">
							No attachments available
						</p>
					)}
				</CollapsibleSection>

				{/* QR Code Section */}
				<CollapsibleSection title="QR Verification">
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-center rounded-lg border border-border/50 bg-background p-3">
							<div
								ref={qrRef}
								className="flex size-24 items-center justify-center overflow-hidden [&_svg]:max-h-full [&_svg]:max-w-full [&_canvas]:max-h-full [&_canvas]:max-w-full [&_img]:max-h-full [&_img]:max-w-full"
							>
								<UrlQrCode url={getVerificationUrl(doc.documentNumber)} />
							</div>
						</div>

						<Button
							type="button"
							onClick={() => onDownload(doc, qrRef.current)}
							disabled={isDisabled}
							className="w-full gap-1.5 text-xs"
						>
							{isDownloading ? (
								<Loader className="size-3 animate-spin" />
							) : (
								<GalleryImport size={14} />
							)}
							{isDownloading ? "Generating..." : "Download QR"}
						</Button>
					</div>
				</CollapsibleSection>
			</div>
		</article>
	);
};

const Table = ({ documents }: { documents: Documents[] }) => {
	const [downloadingId, setDownloadingId] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const deleteDocument = useDeleteDocument();

	const handleDeletion = (id: string) => {
		if (deletingId !== null || downloadingId !== null) return;

		const proceed = window.confirm(
			"Do you wish to delete this verification document?",
		);

		if (!proceed) {
			toast.info("Deletion was cancelled.");
			return;
		}

		setDeletingId(id);

		deleteDocument.mutate(
			{ data: { id } },
			{
				onSuccess: () => {
					toast.success("Verification document was deleted successfully.");
					setDeletingId(null);
				},
				onError: (error) => {
					toast.error(
						error.message ||
							"Failed to delete verification document. Please try again.",
					);
					setDeletingId(null);
				},
			},
		);
	};

	const handleDownloadImage = async (
		doc: Documents,
		qrElement: HTMLElement | null,
	): Promise<void> => {
		if (downloadingId !== null || deletingId !== null) return;

		if (!qrElement) {
			toast.error("QR code is not available for download.");
			return;
		}

		setDownloadingId(doc.id);
		toast.info("Preparing QR code download...");

		try {
			await downloadAsImage(qrElement, doc.documentNumber);
		} catch (error) {
			toast.error(
				error instanceof Error && error.message
					? error.message
					: "Failed to download QR code. Please try again.",
			);
		} finally {
			setDownloadingId(null);
		}
	};

	if (documents.length === 0) {
		return (
			<main className="w-full">
				<section className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-12 text-center">
					<div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-muted">
						<DocumentText1
							size={24}
							variant="Bulk"
							className="text-muted-foreground"
						/>
					</div>

					<h3 className="text-sm font-semibold">No verification documents</h3>

					<p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
						Your verification documents will appear here once they have been
						added.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className="w-full">
			<section className="grid auto-rows-max gap-3 grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3">
				{documents.map((doc) => (
					<DocumentCard
						key={doc.id}
						doc={doc}
						isDownloading={downloadingId === doc.id}
						isDeleting={deletingId === doc.id}
						isDisabled={downloadingId !== null || deletingId !== null}
						onDownload={handleDownloadImage}
						onDelete={handleDeletion}
					/>
				))}
			</section>
		</main>
	);
};

export default Table;
