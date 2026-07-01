import { createServerFn } from "@tanstack/react-start";

import { DeleteEntitySchema } from "./schema";
import { deleteStorageFile, processAndUploadFile } from "./storage.server";

// Upload Storage File
export const uploadStorageFile = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Payload must be FormData");
		}
		return data;
	})
	.handler(async ({ data }) => {
		const file = data.get("file");

		if (!file || !(file instanceof File)) {
			throw new Error("No valid file provided in the request.");
		}

		return await processAndUploadFile(file);
	});

// Delete File
export const removeStorageFileFn = createServerFn({ method: "POST" })
	.inputValidator(DeleteEntitySchema)
	.handler(async ({ data }) => {
		return await deleteStorageFile(data.id);
	});
