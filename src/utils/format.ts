/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import converter from "number-to-words";

// Reusable Appwrite Mapper
export function mapAppwriteRow<T>(row: any): T & {
	id: string;
	createdAt: string;
	updatedAt: string;
} {
	const {
		$id,
		$createdAt,
		$updatedAt,
		$databaseId,
		$tableId,
		$permissions,
		$sequence,
		...data
	} = row;

	return {
		id: $id,
		createdAt: $createdAt,
		updatedAt: $updatedAt,
		...(data as T),
	};
}

// Get the word version of a number
export const toWords = (value: number): string => {
	const inWords = converter.toWords(value);
	return inWords;
};

// Parse Strings Back to Objects
export function parsePayload(updates: any, jsonFields: any) {
	const u: any = { ...updates };
	for (const key of jsonFields) {
		if (u[key] !== undefined) u[key] = JSON.parse(u[key]);
	}
	return u;
}

// Format Date and Time
export const formatDate = (
	dateInput: Date | string | number,
	variant: "long" | "short" = "long",
) => {
	const date = new Date(dateInput);

	if (variant === "short") {
		const datePart = date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

		const timePart = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});

		return `${datePart}, ${timePart}`;
	}

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Format Currency
export const formatCurrency = (value: number, max = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: max,
	}).format(value);
};

// Format Without Currency
export const format = (value: number, max = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "decimal",
		minimumFractionDigits: 2,
		maximumFractionDigits: max,
	}).format(value);
};

// Check if a Document is an Image
export const isImage = (name: string) =>
	/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);

// Format Only Date
export function formatOnlyDate(dateInput: string | number | Date) {
	const d = new Date(dateInput);

	const day = d.getDate();
	const month = d.toLocaleString("en-US", { month: "long" });
	const year = d.getFullYear();

	return `${day} ${month} ${year}`;
}
