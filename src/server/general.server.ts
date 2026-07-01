/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { Client, ID, TablesDB } from "node-appwrite";

import { mapAppwriteRow, parsePayload } from "#/utils/format";
import { getRequiredEnv } from "#/utils/generate";
import type {
	CreateContactPayload,
	CreateDocumentPayload,
	CreateInvoicePayload,
	CreateProductPayload,
	CreateTerminalPayload,
	CreateTsrPayload,
	NewRegistryPayload,
	QuoteRequest,
	UpdateInvoicePayload,
	UpdateTsrPayload,
} from "./schema";
import { deleteStorageFile } from "./storage.server";

// Environment Variables
const ENDPOINT = getRequiredEnv(process.env.APPWRITE_ENDPOINT, "ENDPOINT");
const PROJECT_ID = getRequiredEnv(
	process.env.APPWRITE_PROJECT_ID,
	"PROJECT_ID",
);
const API_KEY = getRequiredEnv(
	process.env.APPWRITE_API_KEY,
	"APPWRITE_API_KEY",
);
const DATABASE_ID = getRequiredEnv(
	process.env.APPWRITE_DATABASE_ID,
	"APPWRITE_DATABASE_ID",
);
const PRODUCTS_ID = getRequiredEnv(
	process.env.APPWRITE_PRODUCTS_COLLECTION_ID,
	"APPWRITE_PRODUCTS_COLLECTION_ID",
);
const TERMINALS_ID = getRequiredEnv(
	process.env.APPWRITE_TERMINALS_COLLECTION_ID,
	"APPWRITE_TERMINALS_COLLECTION_ID",
);
const QUOTES_ID = getRequiredEnv(
	process.env.APPWRITE_QUOTES_COLLECTION_ID,
	"APPWRITE_QUOTES_COLLECTION_ID",
);
const TSRs_ID = getRequiredEnv(
	process.env.APPWRITE_TSRs_COLLECTION_ID,
	"APPWRITE_TSRs_COLLECTION_ID",
);
const INVOICE_ID = getRequiredEnv(
	process.env.APPWRITE_INVOICES_ID,
	"APPWRITE_INVOICES_ID",
);
const VAULT_ID = getRequiredEnv(
	process.env.APPWRITE_VAULT_ID,
	"APPWRITE_VAULT_ID",
);
const REGISTRY_ID = getRequiredEnv(
	process.env.APPWRITE_REGISTRY_ID,
	"APPWRITE_REGISTRY_ID",
);
const CONTACT_ID = getRequiredEnv(
	process.env.APPWRITE_CONTACTS_ID,
	"APPWRITE_CONTACTS_ID",
);

// Initialize Server Client
const client = new Client()
	.setEndpoint(ENDPOINT)
	.setProject(PROJECT_ID)
	.setKey(API_KEY);

// Singleton pattern for TablesDB
let tablesDB: TablesDB | null = null;

function getAppwriteDb() {
	if (tablesDB) return tablesDB;
	tablesDB = new TablesDB(client);
	return tablesDB;
}

// ==========================================
// QUOTE SERVICES
// ==========================================

// Generate Instant Quote
export async function generateSecureQuote(
	data: QuoteRequest,
): Promise<QuoteResponse> {
	const db = getAppwriteDb();

	// Fetch Product using getRow with Object Syntax
	const product = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: PRODUCTS_ID,
		rowId: data.productId,
	});
	const productClass = product.class;

	// Fetch Terminal using getRow with Object Syntax
	const terminal = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: TERMINALS_ID,
		rowId: data.terminalId,
	});

	// Dynamically select the correct rate based on the product class
	const rateKey = `rate${productClass}`;
	const storageRate = terminal[rateKey];

	if (!storageRate) {
		throw new Error(
			`Invalid storage rate for selected product class: ${productClass}`,
		);
	}

	// Calculate the cost securely on the server
	const totalCost = data.quantity * storageRate * data.days;

	// Generate Validity Date (72 hours from now)
	const validityDate = new Date();
	validityDate.setHours(validityDate.getHours() + 72);

	// Save Quote using createRow with Object Syntax
	await db.createRow({
		databaseId: DATABASE_ID,
		tableId: QUOTES_ID,
		rowId: ID.unique(),
		data: {
			email: data.email,
			company: data.companyName,
			terminalId: terminal.name,
			productName: product.name,
			quantity: data.quantity,
			days: data.days,
			calculatedCost: totalCost,
		},
	});

	return {
		storageRate,
		totalCost,
		quoteValidity: validityDate.toISOString(),
	};
}

// Fetch All Saved Quotes
export async function getAllQuotes() {
	const db = getAppwriteDb();

	// Fetch all rows from the quotes table
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: QUOTES_ID,
	});

	// Map each row to strip out internal Appwrite system properties
	const records: Quote[] = response.rows.map((row) => mapAppwriteRow(row));

	return {
		total: response.total,
		rows: records,
	};
}

// Delete a Quote
export async function deleteQuote(
	quoteId: string,
): Promise<{ success: boolean }> {
	const db = getAppwriteDb();

	try {
		await db.deleteRow({
			databaseId: DATABASE_ID,
			tableId: QUOTES_ID,
			rowId: quoteId,
		});

		return { success: true };
	} catch (error) {
		console.error(`Failed to delete quote with ID ${quoteId}:`, error);
		throw new Error("Could not delete the requested quote.");
	}
}

// ==========================================
// PRODUCTS SERVICE
// ==========================================

// Create Product
export async function createProduct(data: CreateProductPayload) {
	const db = getAppwriteDb();
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: PRODUCTS_ID,
		rowId: ID.unique(),
		data: data,
	});
	return mapAppwriteRow(response);
}

// Get All Products
export async function getAllProducts() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: PRODUCTS_ID,
	});

	const records: Products[] = response.rows.map((row) => mapAppwriteRow(row));
	return {
		total: response.total,
		rows: records,
	};
}

// Delete Product
export async function deleteProduct(productId: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: PRODUCTS_ID,
		rowId: productId,
	});
	return { success: true };
}

// ==========================================
// TERMINALS SERVICE
// ==========================================

// Create Terminal
export async function createTerminal(data: CreateTerminalPayload) {
	const db = getAppwriteDb();
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: TERMINALS_ID,
		rowId: ID.unique(),
		data: data,
	});
	return mapAppwriteRow(response);
}

// Get All Terminals
export async function getAllTerminals() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: TERMINALS_ID,
	});
	const records: Terminals[] = response.rows.map((row) => mapAppwriteRow(row));

	return {
		total: response.total,
		rows: records,
	};
}

// Delete Terminal
export async function deleteTerminal(terminalId: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: TERMINALS_ID,
		rowId: terminalId,
	});
	return { success: true };
}

// ==========================================
// TSR SERVICE
// ==========================================

const jsonFields = [
	"depositor",
	"terminalDetails",
	"productInfo",
	"inventoryPosition",
	"storageValidity",
	"storageSummary",
	"lineItems",
	"tankDetails",
] as const;
function prepareTsrPayload(updates: any) {
	const u: any = { ...updates };
	for (const key of jsonFields) {
		if (u[key] !== undefined) u[key] = JSON.stringify(u[key]);
	}
	return u;
}

// Create TSR
export async function createTsrRecord(data: CreateTsrPayload) {
	const db = getAppwriteDb();

	// Prepare the document mapping (Stringify nested objects)
	const payload = prepareTsrPayload(data);

	// Save to Appwrite
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: TSRs_ID,
		rowId: data.tsrNumber,
		data: payload,
	});

	return mapAppwriteRow(response);
}

// Get TSR
export async function getTsrRecord(tsrId: string) {
	const db = getAppwriteDb();
	const row = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: TSRs_ID,
		rowId: tsrId,
	});

	const parsedRow = mapAppwriteRow(row);

	// Parse strings back to objects for the frontend
	const result: TSR = parsePayload(parsedRow, jsonFields);
	return result;
}

// Get All TSRs
export async function getAllTsrRecord() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: TSRs_ID,
	});
	const results = response.rows.map((row) => mapAppwriteRow(row));
	const records: TSR[] = results.map((result) =>
		parsePayload(result, jsonFields),
	);

	return {
		total: response.total,
		rows: records,
	};
}

// Update TSR
export async function updateTsrRecord(updates: UpdateTsrPayload) {
	const db = getAppwriteDb();

	const updatePayload = prepareTsrPayload(updates.data);
	return await db.updateRow({
		databaseId: DATABASE_ID,
		tableId: TSRs_ID,
		rowId: updates.id,
		data: updatePayload,
	});
}

// Delete TSR
export async function deleteTsrRecord(id: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: TSRs_ID,
		rowId: id,
	});
	return { success: true };
}

// ==========================================
// INVOICE SERVICE
// ==========================================

const fields = [
	"bankDetails",
	"walletDetails",
	"billedTo",
	"serviceCharge",
	"breakdown",
] as const;
function prepareInvoicePayload(updates: any) {
	const u: any = { ...updates };
	for (const key of fields) {
		if (u[key] !== undefined) u[key] = JSON.stringify(u[key]);
	}
	return u;
}

// Create Invoice
export async function createInvoiceRecord(data: CreateInvoicePayload) {
	const db = getAppwriteDb();

	// Prepare the Payload
	const documentData = prepareInvoicePayload(data);

	// Save to Appwrite
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: INVOICE_ID,
		rowId: data.invoiceNumber,
		data: documentData,
	});

	return mapAppwriteRow(response);
}

// Get Invoice
export async function getInvoice(invoiceId: string) {
	const db = getAppwriteDb();
	const row = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: INVOICE_ID,
		rowId: invoiceId,
	});

	const parsedRow = mapAppwriteRow(row);

	// Parse strings back to objects for the frontend
	const result = parsePayload(parsedRow, fields);
	return result;
}

// Get All Invoices
export async function getAllInvoices() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: INVOICE_ID,
	});
	const results = response.rows.map((row) => mapAppwriteRow(row));
	const records: Invoice[] = results.map((result) =>
		parsePayload(result, fields),
	);

	return {
		total: response.total,
		rows: records,
	};
}

// Update Invoice
export async function updateInvoice(updates: UpdateInvoicePayload) {
	const db = getAppwriteDb();

	const updatePayload = prepareInvoicePayload(updates.data);
	return await db.updateRow({
		databaseId: DATABASE_ID,
		tableId: INVOICE_ID,
		rowId: updates.id,
		data: updatePayload,
	});
}

// Delete Invoice
export async function deleteInvoiceRecord(id: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: INVOICE_ID,
		rowId: id,
	});
	return { success: true };
}

// ==========================================
// DOCUMENT SERVICES
// ==========================================

// Create Document
export async function createDocumentRecord(data: CreateDocumentPayload) {
	const db = getAppwriteDb();
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: VAULT_ID,
		rowId: data.documentNumber,
		data: {
			documentNumber: data.documentNumber,
			images: JSON.stringify(data.images),
		},
	});
	return mapAppwriteRow(response);
}

// Get Document
export async function getDocumentRecord(documentNumber: string) {
	const db = getAppwriteDb();
	const row = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: VAULT_ID,
		rowId: documentNumber,
	});

	const parsedRow = mapAppwriteRow(row);

	// Parse strings back to objects for the frontend
	const result = parsePayload(parsedRow, ["images"]);
	return result;
}

// Get All Document
export async function getAllDocument() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: VAULT_ID,
	});
	const results: Documents[] = response.rows.map((row) => mapAppwriteRow(row));
	const records = results.map((result) => parsePayload(result, ["images"]));

	return {
		total: response.total,
		rows: records,
	};
}

// Delete Document
export async function deleteDocumentRecord(id: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: VAULT_ID,
		rowId: id,
	});
	return { success: true };
}

// ==========================================
// IMAGE REGISTRY SERVICES
// ==========================================

// Add to Registry
export async function addImageToRegistry(data: NewRegistryPayload) {
	const db = getAppwriteDb();
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: REGISTRY_ID,
		rowId: ID.unique(),
		data: data,
	});
	return mapAppwriteRow(response);
}

// Get All Images in Registry
export async function getAllImages() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: REGISTRY_ID,
	});
	const records: RegistryFile[] = response.rows.map((row) =>
		mapAppwriteRow(row),
	);

	return {
		total: response.total,
		rows: records,
	};
}

// Delete from Registry
export async function deleteImageFromRegistry(registryId: string) {
	const db = getAppwriteDb();

	// Fetch the registry row to get the actual Storage fileId
	const record = await db.getRow({
		databaseId: DATABASE_ID,
		tableId: REGISTRY_ID,
		rowId: registryId,
	});

	const fileId = record.fileId;

	// Delete the physical file from Storage Bucket FIRST
	await deleteStorageFile(fileId);

	// If storage deletion succeeds, delete the database record
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: REGISTRY_ID,
		rowId: registryId,
	});

	return { success: true };
}

// ==========================================
// CONTACTS SERVICES
// ==========================================

// Create Contact
export async function createContact(data: CreateContactPayload) {
	const db = getAppwriteDb();
	const response = await db.createRow({
		databaseId: DATABASE_ID,
		tableId: CONTACT_ID,
		rowId: ID.unique(),
		data: data,
	});
	return mapAppwriteRow(response);
}

// Get All Contacts
export async function getAllContacts() {
	const db = getAppwriteDb();
	const response = await db.listRows({
		databaseId: DATABASE_ID,
		tableId: CONTACT_ID,
	});
	const records: Contact[] = response.rows.map((row) => mapAppwriteRow(row));

	return {
		total: response.total,
		rows: records,
	};
}

// Delete Contact
export async function deleteContact(id: string) {
	const db = getAppwriteDb();
	await db.deleteRow({
		databaseId: DATABASE_ID,
		tableId: CONTACT_ID,
		rowId: id,
	});
	return { success: true };
}
