import { useQuery } from "@tanstack/react-query";

import * as Functions from "#/server/general.functions";

// Fetch All Quotes
export function useAllQuotes() {
	return useQuery({
		queryKey: ["quotes"],
		queryFn: () => Functions.fetchAllQuotesFn(),
	});
}

// Fetch All Products
export function useAllProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => Functions.fetchAllProductsFn(),
	});
}

// Fetch All Terminals
export function useAllTerminals() {
	return useQuery({
		queryKey: ["terminals"],
		queryFn: () => Functions.fetchAllTerminalsFn(),
	});
}

// Fetch TSR
export function useTSR(id: string, enabled = true) {
	return useQuery({
		queryKey: ["tsr", id],
		queryFn: () => Functions.fetchTSRFn({ data: { id } }),
		enabled: !!id && id.length > 5 && id.length > 5 && enabled,
	});
}

// Fetch All TSR
export function useAllTSRs() {
	return useQuery({
		queryKey: ["tsrs"],
		queryFn: () => Functions.fetchAllTSRFn(),
	});
}

// Fetch Invoice
export function useInvoice(id: string, enabled = true) {
	return useQuery({
		queryKey: ["invoice", id],
		queryFn: () => Functions.fetchInvoiceFn({ data: { id } }),
		enabled: !!id && enabled,
	});
}

// Fetch All Invoice
export function useAllInvoices() {
	return useQuery({
		queryKey: ["invoices"],
		queryFn: () => Functions.fetchAllInvoiceFn(),
	});
}

// Fetch Document
export function useDocument(id: string, enabled = true) {
	return useQuery({
		queryKey: ["document", id],
		queryFn: () => Functions.fetchDocumentFn({ data: { id } }),
		enabled: !!id && id.length > 5 && enabled,
	});
}

// Fetch All Documents
export function useAllDocuments() {
	return useQuery({
		queryKey: ["documents"],
		queryFn: () => Functions.fetchAllDocumentFn(),
	});
}

// Fetch All Images from Registry
export function useAllImages() {
	return useQuery({
		queryKey: ["registry"],
		queryFn: () => Functions.fetchAllImagesFn(),
	});
}

// Fetch All Contacts
export function useAllContacts() {
	return useQuery({
		queryKey: ["contacts"],
		queryFn: () => Functions.fetchAllContactsFn(),
	});
}
