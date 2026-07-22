import apiClient from "./apiClient";

export interface Story {
	id: number;
	title: string;
	image: string;
	short_description: string;
	description: string;
	song_title?: string;
	song_artist?: string;
	song_url?: string;
	category: string;
	type: string;
	slug: string;
}

export const fetchStories = async (category?: string): Promise<Story[]> => {
	try {
		const response = await apiClient.get("/stories", {
			params: { category },
		});
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error("Failed to fetch stories from API:", error);
		return [];
	}
};

export const fetchStoryDetail = async (slug: string): Promise<Story | null> => {
	try {
		const response = await apiClient.get(`/stories/${slug}`);
		return response.data.success ? response.data.data : null;
	} catch (error) {
		console.error(`Failed to fetch story details for slug: ${slug}`, error);
		return null;
	}
};
