// Upload Response
declare type UploadResponse = {
	fileId: string;
	fileUrl: string;
};

// Quote Response
declare type QuoteResponse = {
	storageRate: number;
	totalCost: number;
	quoteValidity: string;
};

// Registry File
declare type RegistryFile = {
	createdAt: string;
	fileId: string;
	id: string;
	name: string;
	updatedAt: string;
	url: string;
};

// Product
declare type Products = {
	class: string;
	createdAt: string;
	id: string;
	name: string;
	updatedAt: string;
};

// Terminals
declare type Terminals = {
	name: string;
	active: boolean;
	rateA: number;
	rateB: number;
	rateC: number;
	rateD: number;
	rateE: number;
	country: string;
	createdAt: string;
	id: string;
	updatedAt: string;
};

// Verification Documents
declare type Documents = {
	id: string;
	documentNumber: string;
	images: string[];
	createdAt: string;
	updatedAt: string;
};

// TSR Form Payload
type TsrKeyValue = Record<string, string | number>;

declare type TsrPayload = {
	tsrNumber: string;

	depositor: TsrKeyValue;
	terminalDetails: TsrKeyValue;
	productInfo: TsrKeyValue;
	inventoryPosition: TsrKeyValue;
	storageValidity: TsrKeyValue;
	storageSummary: TsrKeyValue;

	lineItems: TsrLineItem[];
	tankDetails: TsrTank[];

	totalAmount: number;
	signatureUrl: string;
	signatureName: string;
	signatureTitle: string;

	currency: string;
	issuedDate: string;
	issuedTime: string;
};

// TSR Item
declare type TsrItem = {
	description: string;
	quantityText: string;
	rateText: string;
	amount: number;
};

// TSR Tank Details
declare type TsrTank = {
	tankNo: string;
	product: string;
	capacity: number;
	ullage: number;
};

// TSR
declare type TSR = {
	createdAt: string;
	updatedAt: string;
	currency: string;
	id: string;
	tsrNumber: string;
	issuedDate: string;
	issuedTime: string;
	totalAmount: number;
	signatureUrl: string;
	signatureName: string;
	signatureTitle: string;

	depositor: TsrKeyValue;
	inventoryPosition: TsrKeyValue;
	productInfo: TsrKeyValue;
	storageSummary: TsrKeyValue;
	storageValidity: TsrKeyValue;
	terminalDetails: TsrKeyValue;

	tankDetails: Array<TsrTank>;
	lineItems: Array<TsrItem>;
};

// Invoice
declare type InvoiceLineItem = {
	label: string;
	amount: number;
};

declare type InvoicePayload = {
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	currency: string;

	billedTo: Record<string, string | number>;
	serviceCharge: {
		title: string;
		body: string;
		details: Record<string, string | number>;
	};
	breakdown: InvoiceLineItem[];
	bankDetails: Record<string, string | number>;
	walletDetails: Record<string, string | number>;
};

declare type Invoice = {
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	currency: string;

	billedTo: Record<string, string | number>;
	serviceCharge: {
		title: string;
		body: string;
		details: Record<string, string | number>;
	};
	breakdown: InvoiceLineItem[];
	bankDetails: Record<string, string | number>;
	walletDetails: Record<string, string | number>;

	createdAt: string;
	id: string;
	updatedAt: string;
};

// Contact
declare type Contact = {
	fullName: string;
	company: string;
	email: string;
	phone: string;
	service: string;
	message: string;
	createdAt: string;
	id: string;
	updatedAt: string;
};

// Quotes
declare type Quote = {
	email: string;
	company: string;
	terminalId: string;
	productName: string;
	quantity: number;
	days: number;
	calculatedCost: number;
	createdAt: string;
	id: string;
	updatedAt: string;
};
