import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "react-fox-toast";

// For Getting Env
export function getRequiredEnv(value: string | undefined, name: string) {
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

// Copy To Clipboard
export async function copyToClipboard(text: string) {
	await navigator.clipboard.writeText(text);
	toast.success("Text copied successfully");
}

// Download as Image
export async function downloadAsImage(
	element: HTMLDivElement,
	filename: string,
) {
	try {
		const dataUrl = await toPng(element, {
			cacheBust: true,
			pixelRatio: 2,
		});

		const link = document.createElement("a");
		link.download = `${filename}.png`;
		link.href = dataUrl;
		link.click();
	} catch (error) {
		toast.error("Failed to download Image, please try again.");
		console.error("Failed to download image:", error);
		throw error;
	}
}

// Download as PDF
export async function downloadAsPdf(element: HTMLDivElement, filename: string) {
	try {
		const dataUrl = await toJpeg(element, {
			cacheBust: true,
			pixelRatio: 1.5,
			quality: 0.95,
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
			"MEDIUM",
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
				"MEDIUM",
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
