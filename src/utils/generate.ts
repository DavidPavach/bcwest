import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "react-fox-toast";

// Helpers
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
	// Wait for fonts.
	if (document.fonts?.ready) {
		await document.fonts.ready;
	}

	// Wait for images inside the document.
	const images = Array.from(element.querySelectorAll("img"));

	await Promise.all(
		images.map(
			(img) =>
				new Promise<void>((resolve) => {
					if (img.complete) {
						resolve();
						return;
					}

					img.addEventListener("load", () => resolve(), {
						once: true,
					});

					img.addEventListener("error", () => resolve(), {
						once: true,
					});
				}),
		),
	);
}

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

		const rect = element.getBoundingClientRect();

		if (!rect.width || !rect.height) {
			throw new Error("The document has no measurable dimensions.");
		}

		const A4_WIDTH_MM = 210;

		// Slightly higher than 300 DPI
		const TARGET_DPI = 330;

		const targetWidthPx = (A4_WIDTH_MM / 25.4) * TARGET_DPI;

		const pixelRatio = Math.min(Math.max(targetWidthPx / rect.width, 2), 4);

		const computedStyles = getComputedStyle(element);

		const backgroundColor =
			computedStyles.backgroundColor === "transparent" ||
			computedStyles.backgroundColor === "rgba(0, 0, 0, 0)"
				? "#ffffff"
				: computedStyles.backgroundColor;

		const dataUrl = await toPng(element, {
			cacheBust: true,
			pixelRatio,
			backgroundColor,
		});

		const image = new Image();

		await new Promise<void>((resolve, reject) => {
			image.onload = () => resolve();
			image.onerror = () =>
				reject(new Error("Failed to load generated PDF image."));

			image.src = dataUrl;
		});

		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
			compress: true,
		});

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		const imageWidth = pageWidth;
		const imageHeight = (image.height * imageWidth) / image.width;

		let heightLeft = imageHeight;
		let position = 0;

		pdf.addImage(
			dataUrl,
			"PNG",
			0,
			position,
			imageWidth,
			imageHeight,
			undefined,
			"FAST",
		);

		heightLeft -= pageHeight;

		while (heightLeft > 0) {
			position -= pageHeight;

			pdf.addPage();

			pdf.addImage(
				dataUrl,
				"PNG",
				0,
				position,
				imageWidth,
				imageHeight,
				undefined,
				"FAST",
			);

			heightLeft -= pageHeight;
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
