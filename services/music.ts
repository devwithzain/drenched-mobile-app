import apiClient from "./apiClient";

export interface MusicTrack {
	id: number;
	title: string;
	bg: string;
	album: string;
	artist: string;
	audio: string;
}

export const fetchMusic = async (): Promise<MusicTrack[]> => {
	try {
		const response = await apiClient.get("/music");
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error("Failed to fetch scripture music from API:", error);
		return [];
	}
};
