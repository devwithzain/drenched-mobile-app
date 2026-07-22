import apiClient from "./apiClient";

export interface BibleVerse {
	id: number;
	title: string;
	content: string;
	verse_date?: string;
	author?: string;
	status?: string;
}

export const fetchVerses = async (book: string, chapter?: number): Promise<BibleVerse[]> => {
	try {
		const endpoint = chapter ? `/verses/${book}/${chapter}` : `/verses/${book}`;
		const response = await apiClient.get(endpoint);
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error(`Failed to fetch verses for ${book} ${chapter || ""}:`, error);
		return [];
	}
};
