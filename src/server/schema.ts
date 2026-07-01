import { z } from "zod";

// Shared
export const DeleteEntitySchema = z.object({
	id: z.string(),
});

export const GetEntitySchema = z.object({
	id: z.string(),
});

const KeyValuePairSchema = z.record(
	z.string(),
	z.union([z.string(), z.number()]),
);

export const InvoiceLineItemSchema = z.object({
	label: z.string(),
	amount: z.number().nonnegative(),
});

// New Quote Schema
export const QuoteRequestSchema = z.object({
	email: z.email(),
	companyName: z.string().min(2),
	terminalId: z.string(),
	productId: z.string(),
	quantity: z.number().positive(),
	days: z.number().int().positive(),
});

// Delete Quote
export const QuoteDeletionSchema = z.object({
	quoteId: z.string(),
});

// Create Product
export const CreateProductSchema = z.object({
	name: z.string().min(2, "Product name must be at least 2 characters"),
	class: z.string(),
});

// Create Terminal
export const CreateTerminalSchema = z.object({
	name: z
		.string()
		.min(2, { error: "Terminal name must be at least 2 characters" }),
	country: z.string().optional(),
	active: z.boolean().default(true),
	rateA: z.number().positive(),
	rateB: z.number().positive(),
	rateC: z.number().positive(),
	rateD: z.number().positive(),
	rateE: z.number().positive(),
});

// TSR Line Item Schema
export const TsrLineItemSchema = z.object({
	description: z.string(),
	quantityText: z.string(),
	rateText: z.string(),
	amount: z.number().nonnegative(),
});

// Tank Details Schema
export const TankDetailsSchema = z.object({
	tankNo: z.string(),
	product: z.string(),
	capacity: z.number().positive(),
	ullage: z.number().positive(),
});

// Create New TSR
export const CreateTsrPayloadSchema = z.object({
	tsrNumber: z.string(),
	depositor: KeyValuePairSchema,
	terminalDetails: KeyValuePairSchema,
	productInfo: KeyValuePairSchema,
	inventoryPosition: KeyValuePairSchema,
	storageValidity: KeyValuePairSchema,
	storageSummary: KeyValuePairSchema,
	lineItems: z
		.array(TsrLineItemSchema)
		.min(1, "Must have at least one line item"),
	tankDetails: z.array(TankDetailsSchema).optional(),
	totalAmount: z.number().positive(),
	signatureUrl: z.url(),
	signatureName: z.string(),
	signatureTitle: z.string(),
	currency: z.string(),
	issuedDate: z.string(),
	issuedTime: z.string(),
});

// Update TSR
export const UpdateTsrPayloadSchema = z.object({
	data: CreateTsrPayloadSchema.partial(),
	id: z.string(),
});

// Create New Invoice
export const CreateInvoicePayloadSchema = z.object({
	invoiceNumber: z.string().min(1, { error: "Invoice number is required" }),
	issueDate: z.string(),
	dueDate: z.string(),
	currency: z.string().default("USD"),
	billedTo: KeyValuePairSchema,
	serviceCharge: z.object({
		title: z.string(),
		body: z.string(),
		details: KeyValuePairSchema,
	}),
	breakdown: z
		.array(InvoiceLineItemSchema)
		.min(1, "At least one cost item is required"),
	bankDetails: KeyValuePairSchema,
	walletDetails: KeyValuePairSchema,
});

// Update Invoice
export const UpdateInvoicePayloadSchema = z.object({
	data: CreateInvoicePayloadSchema.partial(),
	id: z.string(),
});

// Document Upload
export const CreateDocumentPayloadSchema = z.object({
	documentNumber: z.string().min(1, { error: "Document number is required" }),
	images: z.array(z.string()).min(1, "At least one image is required"),
});

// Add Image to Registry
export const NewRegistrySchema = z.object({
	fileId: z.string(),
	url: z.url(),
	name: z.string().optional(),
});

// New Contact
export const CreateContactSchema = z.object({
	fullName: z.string(),
	company: z.string(),
	email: z.email(),
	phone: z.string(),
	service: z.string(),
	message: z.string(),
});

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
export type CreateTerminalPayload = z.infer<typeof CreateTerminalSchema>;
export type TsrLineItem = z.infer<typeof TsrLineItemSchema>;
export type CreateTsrPayload = z.infer<typeof CreateTsrPayloadSchema>;
export type UpdateTsrPayload = z.infer<typeof UpdateTsrPayloadSchema>;
export type CreateInvoicePayload = z.infer<typeof CreateInvoicePayloadSchema>;
export type UpdateInvoicePayload = z.infer<typeof UpdateInvoicePayloadSchema>;
export type CreateDocumentPayload = z.infer<typeof CreateDocumentPayloadSchema>;
export type NewRegistryPayload = z.infer<typeof NewRegistrySchema>;
export type CreateContactPayload = z.infer<typeof CreateContactSchema>;
