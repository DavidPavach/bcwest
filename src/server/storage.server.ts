import { Client, ID, Storage } from "appwrite";

// Utility For Fetching Envs
import { getRequiredEnv } from "#/utils/generate";

// Environment Variables
const ENDPOINT = getRequiredEnv(process.env.APPWRITE_ENDPOINT, "ENDPOINT");
const PROJECT_ID = getRequiredEnv(
	process.env.APPWRITE_PROJECT_ID,
	"PROJECT_ID",
);
const BUCKET_ID = getRequiredEnv(process.env.APPWRITE_BUCKET_ID, "BUCKET_ID");

// Initialize Appwrite
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const storage = new Storage(client);

// Process Upload File
export async function processAndUploadFile(
	file: File,
): Promise<UploadResponse> {
	try {
		const response = await storage.createFile({
			bucketId: BUCKET_ID,
			fileId: ID.unique(),
			file: file,
		});

		// Get File Url
		const fileUrl = storage.getFileView({
			bucketId: BUCKET_ID,
			fileId: response.$id,
		});

		return {
			fileId: response.$id,
			fileUrl: fileUrl,
		};
	} catch (error) {
		console.error("Appwrite upload failed:", error);
		throw new Error("Failed to upload file to storage.");
	}
}

// Delete File
export async function deleteStorageFile(
	fileId: string,
): Promise<{ success: boolean }> {
	try {
		// Deletes the file permanently from the bucket
		await storage.deleteFile({ bucketId: BUCKET_ID, fileId: fileId });
		return { success: true };
	} catch (error) {
		console.error(`Failed to delete file ${fileId}:`, error);
		throw new Error("Could not delete the file from storage.");
	}
}
