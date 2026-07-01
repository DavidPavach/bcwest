import { createServerFn } from "@tanstack/react-start";

import * as Services from "./general.server";
import * as Schemas from "./schema";

// ==========================================
// QUOTES SERVER FUNCTIONS
// ==========================================

// Get Instant Quote
export const getInstantQuote = createServerFn({ method: "POST" })
	.inputValidator(Schemas.QuoteRequestSchema)
	.handler(async ({ data }) => {
		return await Services.generateSecureQuote(data);
	});

// Fetch All Quotes Function
export const fetchAllQuotesFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllQuotes();
	},
);

// Delete Quote Function
export const removeQuoteFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.QuoteDeletionSchema)
	.handler(async ({ data }) => {
		return await Services.deleteQuote(data.quoteId);
	});

// ==========================================
// PRODUCTS SERVER FUNCTIONS
// ==========================================

// Create New Product
export const addProductFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateProductSchema)
	.handler(async ({ data }) => {
		return await Services.createProduct(data);
	});

// Fetch All Products
export const fetchAllProductsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllProducts();
	},
);

// Delete Product
export const removeProductFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteProduct(data.id);
	});

// ==========================================
// TERMINALS SERVER FUNCTIONS
// ==========================================

// Create New Terminal
export const addTerminalFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateTerminalSchema)
	.handler(async ({ data }) => {
		return await Services.createTerminal(data);
	});

// Fetch All Terminals
export const fetchAllTerminalsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllTerminals();
	},
);

// Delete Terminal
export const removeTerminalFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteTerminal(data.id);
	});

// ==========================================
// TSR SERVER FUNCTIONS
// ==========================================

// Create New TSR
export const generateTSRFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateTsrPayloadSchema)
	.handler(async ({ data }) => {
		return await Services.createTsrRecord(data);
	});

// Get TSR
export const fetchTSRFn = createServerFn({ method: "GET" })
	.inputValidator(Schemas.GetEntitySchema)
	.handler(async ({ data }) => {
		return await Services.getTsrRecord(data.id);
	});

// Get All TSR
export const fetchAllTSRFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllTsrRecord();
	},
);

// Update TSR
export const updateTSRFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.UpdateTsrPayloadSchema)
	.handler(async ({ data }) => {
		return await Services.updateTsrRecord(data);
	});

// Delete TSR
export const deleteTSRFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteTsrRecord(data.id);
	});

// ==========================================
// INVOICE SERVER FUNCTIONS
// ==========================================

// Create New Invoice
export const generateInvoiceFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateInvoicePayloadSchema)
	.handler(async ({ data }) => {
		return await Services.createInvoiceRecord(data);
	});

// Get Invoice
export const fetchInvoiceFn = createServerFn({ method: "GET" })
	.inputValidator(Schemas.GetEntitySchema)
	.handler(async ({ data }) => {
		return await Services.getInvoice(data.id);
	});

// Get All Invoice
export const fetchAllInvoiceFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllInvoices();
	},
);

// Update Invoice
export const updateInvoiceFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.UpdateInvoicePayloadSchema)
	.handler(async ({ data }) => {
		return await Services.updateInvoice(data);
	});

// Delete Invoice
export const deleteInvoiceFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteInvoiceRecord(data.id);
	});

// ==========================================
// DOCUMENT SERVER FUNCTIONS
// ==========================================

// Create New Document
export const newDocumentFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateDocumentPayloadSchema)
	.handler(async ({ data }) => {
		return await Services.createDocumentRecord(data);
	});

// Get Document
export const fetchDocumentFn = createServerFn({ method: "GET" })
	.inputValidator(Schemas.GetEntitySchema)
	.handler(async ({ data }) => {
		return await Services.getDocumentRecord(data.id);
	});

// Get All Document
export const fetchAllDocumentFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllDocument();
	},
);

// Delete Document
export const deleteDocumentFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteDocumentRecord(data.id);
	});

// ==========================================
// REGISTRY SERVER FUNCTIONS
// ==========================================

// Add to Registry
export const addToRegistryFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.NewRegistrySchema)
	.handler(async ({ data }) => {
		return await Services.addImageToRegistry(data);
	});

// Get All Images in Registry
export const fetchAllImagesFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await Services.getAllImages();
	},
);

// Remove from Registry
export const removeFromRegistryFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteImageFromRegistry(data.id);
	});

// ==========================================
// CONTACTS SERVER FUNCTIONS
// ==========================================

// Create New Contact
export const createContactFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.CreateContactSchema)
	.handler(async ({ data }) => {
		return await Services.createContact(data);
	});

// Get all Contacts
export const fetchAllContactsFn = createServerFn({
	method: "GET",
}).handler(async () => {
	return await Services.getAllContacts();
});

// Delete Contacts
export const deleteContactFn = createServerFn({ method: "POST" })
	.inputValidator(Schemas.DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await Services.deleteContact(data.id);
	});
