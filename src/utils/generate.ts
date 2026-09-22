import { toPng } from "html-to-image";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { toast } from "react-fox-toast";

// Environment
export function getRequiredEnv(
	value: string | undefined,
	name: string,
): string {
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

// Helpers
function getSafePageBreaks(element: HTMLElement): number[] {
	const rootRect = element.getBoundingClientRect();
	const rootWidth = element.scrollWidth;
	const rootHeight = element.scrollHeight;

	const breaks = new Set<number>();

	// Always allow the beginning and end.
	breaks.add(0);
	breaks.add(rootHeight);

	const descendants = Array.from(element.querySelectorAll<HTMLElement>("*"));

	for (const child of descendants) {
		const style = getComputedStyle(child);

		if (style.display === "none" || style.visibility === "hidden") {
			continue;
		}

		const rect = child.getBoundingClientRect();

		if (!rect.width || !rect.height) {
			continue;
		}

		const top = rect.top - rootRect.top;
		const bottom = rect.bottom - rootRect.top;

		if (bottom <= 0 || top >= rootHeight) {
			continue;
		}

		const isBlockLike =
			style.display === "block" ||
			style.display === "flex" ||
			style.display === "grid" ||
			style.display === "table" ||
			style.display === "table-row" ||
			style.display === "list-item" ||
			style.display === "flow-root";

		const keepTogether =
			style.breakInside === "avoid" ||
			style.pageBreakInside === "avoid" ||
			child.classList.contains("pdf-keep-together");

		const isMeaningfulWidth = rect.width >= rootWidth * 0.35;

		if ((isBlockLike && isMeaningfulWidth) || keepTogether) {
			breaks.add(Math.round(bottom));
		}
	}

	return [...breaks].sort((a, b) => a - b);
}

function sanitizeFilename(filename: string): string {
	const controlChars = Array.from({ length: 32 }, (_, index) =>
		String.fromCharCode(index),
	).join("");

	return (
		filename
			.trim()
			.replace(/[<>:"/\\|?*]/g, "-")
			.replace(new RegExp(`[${controlChars}]`, "g"), "-")
			.replace(/\s+/g, "-") || "document"
	);
}

async function waitForAssets(element: HTMLElement): Promise<void> {
	// Wait for all document fonts.
	if (document.fonts?.ready) {
		await document.fonts.ready;
	}

	const images = Array.from(element.querySelectorAll("img"));

	await Promise.all(
		images.map(async (img) => {
			if (!img.complete) {
				await new Promise<void>((resolve) => {
					const done = () => resolve();

					img.addEventListener("load", done, {
						once: true,
					});

					img.addEventListener("error", done, {
						once: true,
					});
				});
			}

			try {
				if (typeof img.decode === "function") {
					await img.decode();
				}
			} catch {}
		}),
	);
}

// Copy To Clipboard
export async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		toast.success("Text copied successfully");
	} catch (error) {
		console.error("Failed to copy text:", error);
		toast.error("Failed to copy text. Please try again.");
		throw error;
	}
}

// Download as Image
export async function downloadAsImage(
	element: HTMLElement,
	filename: string,
): Promise<void> {
	try {
		await waitForAssets(element);

		const pixelRatio = Math.min(Math.max(window.devicePixelRatio, 2), 3);

		const backgroundColor =
			getComputedStyle(element).backgroundColor || "#ffffff";

		const dataUrl = await toPng(element, {
			cacheBust: true,
			pixelRatio,
			backgroundColor,
		});

		const link = document.createElement("a");

		link.download = `${sanitizeFilename(filename)}.png`;
		link.href = dataUrl;

		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (error) {
		console.error("Failed to download image:", error);
		toast.error("Failed to download image. Please try again.");
		throw error;
	}
}

// Download as PDF
export async function downloadAsPdf(
	element: HTMLElement,
	filename: string,
): Promise<void> {
	try {
		await waitForAssets(element);

		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => resolve());
			});
		});

		const rect = element.getBoundingClientRect();

		if (!rect.width || !rect.height) {
			throw new Error("The document has no measurable dimensions.");
		}

		const htmlWidth = Math.ceil(
			Math.max(element.scrollWidth, element.offsetWidth, rect.width),
		);

		const htmlHeight = Math.ceil(
			Math.max(element.scrollHeight, element.offsetHeight, rect.height),
		);

		const orientation = htmlWidth >= htmlHeight ? "landscape" : "portrait";

		const pdf = new jsPDF({
			orientation,
			unit: "mm",
			format: "a4",
			compress: true,
			putOnlyUsedFonts: true,
			floatPrecision: 16,
		});

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		const margin = 4;

		const contentWidth = pageWidth - margin * 2;
		const contentHeight = pageHeight - margin * 2;

		const pageHeightInCssPx = (htmlWidth * contentHeight) / contentWidth;

		const MAX_CANVAS_PIXELS = 40_000_000;

		let scale = 3;

		const estimatedPixels = htmlWidth * htmlHeight * scale * scale;

		if (estimatedPixels > MAX_CANVAS_PIXELS) {
			scale = Math.sqrt(MAX_CANVAS_PIXELS / (htmlWidth * htmlHeight));
		}

		scale = Math.max(1, scale);

		const computedStyles = getComputedStyle(element);

		const backgroundColor =
			computedStyles.backgroundColor === "transparent" ||
			computedStyles.backgroundColor === "rgba(0, 0, 0, 0)"
				? "#ffffff"
				: computedStyles.backgroundColor;

		const canvas = await html2canvas(element, {
			scale,

			backgroundColor,

			useCORS: true,
			allowTaint: false,

			imageTimeout: 30_000,

			logging: false,

			scrollX: 0,
			scrollY: 0,

			windowWidth: htmlWidth,
			windowHeight: htmlHeight,
		});

		const safeBreaks = getSafePageBreaks(element);

		if (htmlHeight <= pageHeightInCssPx + 1) {
			const imageHeight = (htmlHeight / htmlWidth) * contentWidth;

			const y = margin + Math.max(0, (contentHeight - imageHeight) / 2);

			pdf.addImage(
				canvas.toDataURL("image/png"),
				"PNG",
				margin,
				y,
				contentWidth,
				imageHeight,
				undefined,
				"SLOW",
			);

			pdf.save(`${sanitizeFilename(filename)}.pdf`);

			return;
		}

		let pageStart = 0;

		while (pageStart < htmlHeight) {
			const idealPageEnd = Math.min(pageStart + pageHeightInCssPx, htmlHeight);

			let pageEnd = idealPageEnd;

			if (idealPageEnd < htmlHeight) {
				const candidates = safeBreaks.filter(
					(point) => point > pageStart + 20 && point <= idealPageEnd,
				);

				if (candidates.length > 0) {
					pageEnd = candidates[candidates.length - 1];
				}
			}

			if (pageEnd <= pageStart) {
				pageEnd = idealPageEnd;
			}

			const sliceHeightCss = pageEnd - pageStart;

			const sourceY = Math.round(pageStart * scale);
			const sourceHeight = Math.round(sliceHeightCss * scale);

			const pageCanvas = document.createElement("canvas");

			pageCanvas.width = canvas.width;
			pageCanvas.height = sourceHeight;

			const context = pageCanvas.getContext("2d");

			if (!context) {
				throw new Error("Unable to create PDF page canvas.");
			}

			context.drawImage(
				canvas,

				0,
				sourceY,
				canvas.width,
				sourceHeight,

				0,
				0,
				canvas.width,
				sourceHeight,
			);

			const imageHeight = (sliceHeightCss / htmlWidth) * contentWidth;

			if (pageStart > 0) {
				pdf.addPage();
			}

			pdf.addImage(
				pageCanvas.toDataURL("image/png"),
				"PNG",
				margin,
				margin,
				contentWidth,
				imageHeight,
				undefined,
				"SLOW",
			);

			pageStart = pageEnd;
		}

		pdf.save(`${sanitizeFilename(filename)}.pdf`);
	} catch (error) {
		console.error("Failed to download PDF:", error);

		toast.error("Failed to download PDF. Please try again.");

		throw error;
	}
}

// Generate Reference Number
export function generateReference(type: string, date = new Date()): string {
	const year = String(date.getFullYear()).slice(-2);
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const dateCode = `${year}${month}${day}`;

	const documentType = type.toUpperCase();

	let prefix: string;
	let length: number;
	let characters: string;

	switch (documentType) {
		case "RECEIPT":
		case "TSR":
			prefix = "RECEIPT";
			length = 20;
			characters = "0123456789";
			break;

		case "INVOICE":
			prefix = "INVOICE";
			length = 12;
			characters = "0123456789";
			break;

		case "QUOTE":
			prefix = "QUOTE";
			length = 10;
			characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			break;

		default:
			throw new Error("Type must be RECEIPT, INVOICE, or QUOTE");
	}

	const randomValues = new Uint32Array(length);
	globalThis.crypto.getRandomValues(randomValues);

	let randomPart = "";

	for (let i = 0; i < length; i++) {
		randomPart += characters[randomValues[i] % characters.length];
	}

	return `BCW-${prefix}-${dateCode}-${randomPart}`;
}
