import { PlayStatus } from "./Presentations.interface";

export interface PlayCoverInfo {
	__type: string;
	ActualLiveStartUnixTimeInMs: null;
	AirDateUnixTimeInMs: number;
	AllowedPlayerIFrameAPISites: string[];
	DefaultThumbnailUrl: string;
	HasQuizzes: boolean;
	IsLiveCountdownEnabled: boolean;
	IsLiveIndicationDelayed: boolean;
	PlayCoverOnlyWhenEmbedded: boolean;
	PlayStatus: PlayStatus;
	ServerTimeForClockSkew: number;
	ThumbnailUrl: string;
	Title: string;
}
