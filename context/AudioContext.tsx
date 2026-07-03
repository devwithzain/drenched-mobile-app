import {
	useAudioPlayer,
	setAudioModeAsync,
	useAudioPlayerStatus,
} from "expo-audio";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Track {
	id: string;
	title: string;
	image: string;
	narrator?: string;
	duration?: string;
	audioUrl?: string;
	subtitle?: string;
}

interface AudioContextType {
	currentTrack: Track | null;
	isPlaying: boolean;
	progress: number;
	positionMs: number;
	durationMs: number;
	loadTrack: (track: Track) => Promise<void>;
	play: () => Promise<void>;
	pause: () => Promise<void>;
	togglePlay: () => Promise<void>;
	seek: (value: number) => Promise<void>;
	skip: (seconds: number) => Promise<void>;
	closeTrack: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

	const player = useAudioPlayer(null, { updateInterval: 100 });
	const status = useAudioPlayerStatus(player);

	useEffect(() => {
		setAudioModeAsync({
			playsInSilentMode: true,
			shouldPlayInBackground: true,
		}).catch((error) => {
			console.warn("Error setting audio mode:", error);
		});
	}, []);

	useEffect(() => {
		if (status.didJustFinish) {
			player.pause();
			player.seekTo(0);
		}
	}, [status.didJustFinish, player]);

	const loadTrack = async (track: Track) => {
		try {
			if (!track.audioUrl) return;

			setCurrentTrack(track);
			player.replace({ uri: track.audioUrl });
			player.play();
		} catch (error) {
			console.error("Error loading track:", error);
		}
	};

	const play = async () => {
		try {
			player.play();
		} catch (error) {
			console.error("Error playing track:", error);
		}
	};

	const pause = async () => {
		try {
			player.pause();
		} catch (error) {
			console.error("Error pausing track:", error);
		}
	};

	const togglePlay = async () => {
		if (status.playing) {
			await pause();
		} else {
			await play();
		}
	};

	const seek = async (value: number) => {
		try {
			if (status.duration > 0) {
				const targetSec = value * status.duration;
				player.seekTo(targetSec);
			}
		} catch (error) {
			console.error("Error seeking track:", error);
		}
	};

	const skip = async (seconds: number) => {
		try {
			const targetSec = status.currentTime + seconds;
			const boundedSec = Math.max(0, Math.min(targetSec, status.duration || 0));
			player.seekTo(boundedSec);
		} catch (error) {
			console.error("Error skipping:", error);
		}
	};

	const closeTrack = async () => {
		try {
			player.pause();
			player.replace(null);
		} catch (e) {
			// Handle error quietly
		}
		setCurrentTrack(null);
	};

	const positionMs = status.currentTime * 1000;
	const durationMs = status.duration * 1000;
	const progress =
		status.duration > 0 ? status.currentTime / status.duration : 0;

	return (
		<AudioContext.Provider
			value={{
				currentTrack,
				isPlaying: status.playing,
				progress,
				positionMs,
				durationMs,
				loadTrack,
				play,
				pause,
				togglePlay,
				seek,
				skip,
				closeTrack,
			}}>
			{children}
		</AudioContext.Provider>
	);
};

export const useAudio = () => {
	const context = useContext(AudioContext);
	if (context === undefined) {
		throw new Error("useAudio must be used within an AudioProvider");
	}
	return context;
};
