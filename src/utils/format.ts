/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

// Reusable Appwrite Mapper
export function mapAppwriteRow<T>(row: any): T & {
	id: string;
	createdAt: string;
	updatedAt: string;
} {
	const {
		$id,
		$createdAt,
		$updatedAt,
		$databaseId,
		$tableId,
		$permissions,
		$sequence,
		...data
	} = row;

	return {
		id: $id,
		createdAt: $createdAt,
		updatedAt: $updatedAt,
		...(data as T),
	};
}
