import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Functions from "#/server/general.functions";
import { uploadStorageFile } from "#/server/storage.functions";

export const useFileUpload = () => {
	return useMutation({
		mutationFn: async (uploadFile: File) => {
			const formData = new FormData();
			formData.append("file", uploadFile);
			return await uploadStorageFile({ data: formData });
		},
	});
};

// Create Quote
export const useCreateQuote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.getInstantQuote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["quotes"] });
		},
	});
};

// Delete Quote
export const useDeleteQuote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.removeQuoteFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["quotes"] });
		},
	});
};

// Create Product
export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.addProductFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

// Delete Product
export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.removeProductFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

// Create Terminal
export const useCreateTerminal = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.addTerminalFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["terminals"] });
		},
	});
};

// Delete Terminal
export const useDeleteTerminal = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.removeTerminalFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["terminals"] });
		},
	});
};

// Create TSR
export const useCreateTSR = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.generateTSRFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tsrs"] });
		},
	});
};

// Update TSR
export const useUpdateTSR = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.updateTSRFn,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["tsrs"] });
			// Optionally invalidate the specific TSR query as well
			if (variables.data.id) {
				queryClient.invalidateQueries({ queryKey: ["tsr", variables.data.id] });
			}
		},
	});
};

// Delete TSR
export const useDeleteTSR = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.deleteTSRFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tsrs"] });
		},
	});
};

// Create Invoice
export const useCreateInvoice = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.generateInvoiceFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invoices"] });
		},
	});
};

// Update Invoice
export const useUpdateInvoice = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.updateInvoiceFn,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["invoices"] });
			if (variables.data.id) {
				queryClient.invalidateQueries({
					queryKey: ["invoice", variables.data.id],
				});
			}
		},
	});
};

// Delete Invoice
export const useDeleteInvoice = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.deleteInvoiceFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invoices"] });
		},
	});
};

// Create Document
export const useCreateDocument = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.newDocumentFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});
};

// Delete Document
export const useDeleteDocument = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.deleteDocumentFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});
};

// Add Image to Registry
export const useAddToRegistry = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.addToRegistryFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["registry"] });
		},
	});
};

// Delete From Registry
export const useRemoveFromRegistry = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.removeFromRegistryFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["registry"] });
		},
	});
};

// Create Contact Request
export const useCreateContact = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.createContactFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contacts"] });
		},
	});
};

// Delete Contact Request
export const useDeleteContact = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: Functions.deleteContactFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contacts"] });
		},
	});
};
