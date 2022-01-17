export interface PlayerOptions {
	d: D;
}

export interface D {
	__type: string;
	CoverageEvents: any[];
	GlobalOptions: GlobalOptions;
	LoginUrl: null;
	PlaybackTicket: null;
	PlayerLayoutOptions: PlayerLayoutOptions;
	PlayerPresentationStatus: number;
	PlayerPresentationStatusMessage: null;
	Presentation: Presentation;
	PresentationBookmark: PresentationBookmark;
	PresentationId: null;
}

export interface GlobalOptions {
	__type: string;
	PlaybackTicket: string;
	PlayerId: string;
	LayoutId: string;
	PlayerName: string;
	IsLayoutPreview: boolean;
	AppRoot: string;
	UseExtensions: boolean;
	UserNameHash: string;
	SessionTimeout: number;
	EnableContextMenuForPlayer: boolean;
	UseLiveEventPolling: boolean;
	SiteBuildNumber: number;
	SiteVersion: string;
	SiteName: string;
	SlideGroupThreshold: number;
	SlideGroupMinToTrigger: number;
	SlideGroupMaxInGroup: number;
	ErrorPage: null;
	ServiceEndpoint: string;
	DisableWindowsMediaPlayer: boolean;
	DisableChromeFlashAssumption: boolean;
	DisableEdgeFlashAssumption: boolean;
	LayoutSupportsPort25: boolean;
	AllowedPlayerIFrameAPISites: string[];
	LiveSmoothStreamingOffset: string;
	AllowPlayerVideoStreamPopout: boolean;
	PlaybackSpeeds: null;
	EnableConviva: boolean;
	ConvivaServiceUrl: string;
	ConvivaCustomerId: string;
	MultisiteId: string;
	FavorDeliverHLS: boolean;
	CompliancePolicyMarkdown: string;
	PlayCoverOnlyWhenEmbedded: boolean;
	EnableAudioDescriptions: boolean;
	HlsJSConfig: null;
	PlayerHelpUrl: string;
	MvPlayerHelpUrl: string;
	ClPlayerHelpUrl: string;
}

export interface PlayerLayoutOptions {
	__type: string;
	Images: Images;
	ThemeId: string;
	ThemeImageBase: string;
	XapName: string;
	VideoAspect: string;
	SlideAspect: string;
	VideoPosition: string;
	EnableReflection: boolean;
	Theme: string;
	PrimaryContent: string;
	FullInitialLayout: string;
	PipSize: string;
	SideBySideSecondarySize: string;
	SlideCarouselSize: string;
	ShowHeaderArea: boolean;
	ShowMainControls: boolean;
	AllowPlayPauseStop: boolean;
	AllowScrubbing: boolean;
	AllowSkipback: boolean;
	AllowSpeedControl: boolean;
	AllowFidelityIndicator: boolean;
	EnablePresentationInfo: boolean;
	EnableSearch: boolean;
	AllowClosedCaptions: boolean;
	AllowVolumeControl: boolean;
	AllowPolls: boolean;
	AllowAskQuestion: boolean;
	AllowShare: boolean;
	AllowLinks: boolean;
	AllowChapterNavigation: boolean;
	AllowHelp: boolean;
	ShowSlideNavigation: boolean;
	AllowLayoutAdjustment: boolean;
	EnableSofoBranding: boolean;
	ShowDateTime: boolean;
	PlayerType: string;
}

export interface Images {
	__type: string;
	FullScreenBanner: DefaultPresenterImage;
	DefaultPresenterImage: DefaultPresenterImage;
	DefaultSlide: DefaultPresenterImage;
	WaitingForPresentationSlide: DefaultPresenterImage;
	PresentationEndedSlide: DefaultPresenterImage;
	VideoThumb: DefaultPresenterImage;
}

export interface DefaultPresenterImage {
	__type: string;
	Height: number;
	ImageFilename: string;
	ImageUrl: string;
	Width: number;
}

export interface Presentation {
	__type: string;
	Streams: Stream[];
	Version: string;
	PlaybackTicketId: string;
	PollingEnabled: boolean;
	LiveCountdownEnabled: boolean;
	LiveIndicationDelayed: boolean;
	ForumEnabled: boolean;
	SharingEnabled: boolean;
	PreferSmoothStreaming: boolean;
	HasSearchableText: boolean;
	IsStandAlone: boolean;
	DisableCaptionDisplay: boolean;
	PlayStatus: string;
	AnonymousAllowed: boolean;
	PresentationId: string;
	Title: string;
	Description: string;
	ThumbnailUrl: string;
	Duration: number;
	AirDate: string;
	AirTime: string;
	UnixTime: number;
	IsDvrPlaybackEnabled: boolean;
	DurationRelativeDvrWindow: number;
	MaximumDvrWindow: number;
	PodcastUrl: null;
	VodcastUrl: null;
	AudioDescriptionsUrl: null;
	TimedEvents: any[];
	Chapters: any[];
	SupportingLinks: any[];
	Presenters: Presenter[];
	Transcript: any[];
	PlayerExtensions: PlayerExtension[];
	ServerClockSkew: number;
	ServerTimeForClockSkew: number;
}

export interface PlayerExtension {
	__type: string;
	Data: string;
	ExtensionBasePath: string;
	ExtensionType: string;
	PlayerTypes: string[];
}

export interface Presenter {
	__type: string;
	BioUrl: string;
	Email: string;
	ImageUrl: string;
	Name: string;
}

export interface Stream {
	__type: string;
	AnonymousAllowed: boolean;
	AspectRatio: number;
	AudioOnly: boolean;
	HasSlideContent: boolean;
	IsStandAlone: boolean;
	PlaybackAudioSource: boolean;
	PreferFullMotion: boolean;
	Priority: number;
	SlideBaseUrl: null;
	SlideImageFileNameTemplate: string;
	SlidePlaybackTicketId: string;
	SlideThumbnailFileNameTemplate: string;
	Slides: any[];
	StreamType: number;
	ThumbnailUrl: string;
	VideoUrls: VideoURL[];
}

export interface Slide {
	__type: string;
	Description: string;
	Number: number;
	StreamType: number;
	Text: string;
	Time: number;
}

export interface VideoURL {
	__type: string;
	CanChangeScheme: boolean;
	Location: string;
	MediaType: string;
	MimeType: string;
	MulticastAddress: null;
	MulticastDiagnosticsServer: null;
	MulticastOnly: boolean;
	MulticastPort: number;
	MulticastReceiverKeyStore: null;
	MulticastReceiverUrl: null;
	SegmentLength: number;
	ServerType: string;
}

export interface PresentationBookmark {
	__type: string;
	position: number;
	savedAt: number;
}
