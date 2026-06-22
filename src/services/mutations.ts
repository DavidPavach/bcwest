import { useMutation } from "@tanstack/react-query";

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

// Usage
// const uploadResult = await uploadFileMutation.mutateAsync(file);
// avatarUrl = uploadResult.fileUrl;
// avatarFileId = uploadResult.fileId;
