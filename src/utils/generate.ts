import { toJpeg, toPng } from "html-to-image";
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
export async function downloadAsPdf(element: HTMLDivElement, filename: string) {
	try {
		await waitForAssets(element);

		const dataUrl = await toJpeg(element, {
			cacheBust: true,
			pixelRatio: 2,
			quality: 1,
			skipFonts: false,
		});

		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
			compress: true,
		});

		const img = new Image();

		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = reject;
			img.src = dataUrl;
		});

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		const imgWidth = pageWidth;
		const imgHeight = (img.height * imgWidth) / img.width;

		let heightLeft = imgHeight;
		let position = 0;

		pdf.addImage(
			dataUrl,
			"JPEG",
			0,
			position,
			imgWidth,
			imgHeight,
			undefined,
			"NONE",
		);

		heightLeft -= pageHeight;

		while (heightLeft > 0) {
			position -= pageHeight;

			pdf.addPage();

			pdf.addImage(
				dataUrl,
				"JPEG",
				0,
				position,
				imgWidth,
				imgHeight,
				undefined,
				"NONE",
			);

			heightLeft -= pageHeight;
		}

		pdf.save(`${filename}.pdf`);
	} catch (error) {
		toast.error("Failed to download PDF, please try again.");
		console.error("Failed to download PDF:", error);
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
