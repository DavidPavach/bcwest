import { Client, ID, Storage } from "appwrite";

// Utility For Fetching Envs
function getRequiredEnv(value: string | undefined, name: string) {
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

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
