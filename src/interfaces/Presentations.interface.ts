export interface Presentations {
    'odata.metadata': string;
    'odata.count': string;
    value: Value[];
    'odata.nextLink': string;
}

export interface Value {
    'odata.type': string;
    'odata.id': string;
    'RelatedPresentations@odata.navigationLinkUrl': string;
    'Tags@odata.navigationLinkUrl': string;
    'TimedEvents@odata.navigationLinkUrl': string;
    'Presenters@odata.navigationLinkUrl': string;
    'Questions@odata.navigationLinkUrl': string;
    'Comments@odata.navigationLinkUrl': string;
    'ThumbnailContent@odata.navigationLinkUrl': string;
    'SlideContent@odata.navigationLinkUrl': string;
    'SlideDetailsContent@odata.navigationLinkUrl': string;
    'OnDemandContent@odata.navigationLinkUrl': string;
    'BroadcastContent@odata.navigationLinkUrl': string;
    'PodcastContent@odata.navigationLinkUrl': string;
    'PublishToGoContent@odata.navigationLinkUrl': string;
    'OcrContent@odata.navigationLinkUrl': string;
    'CaptionContent@odata.navigationLinkUrl': string;
    'AudioPeaksContent@odata.navigationLinkUrl': string;
    'LayoutOptions@odata.navigationLinkUrl': string;
    'EmailInvitation@odata.navigationLinkUrl': string;
    'ShowcaseChannels@odata.navigationLinkUrl': string;
    'ShowcaseChannelsForAllInstances@odata.navigationLinkUrl': string;
    'VideoPodcastContent@odata.navigationLinkUrl': string;
    'Modules@odata.navigationLinkUrl': string;
    'Categories@odata.navigationLinkUrl': string;
    'ExternalPublishingContent@odata.navigationLinkUrl': string;
    'Annotations@odata.navigationLinkUrl': string;
    'ModerateOrAnnotate@odata.navigationLinkUrl': string;
    '#CreateLike': AddCaptionContent;
    '#CreateShortcut': AddCaptionContent;
    '#Upload': AddCaptionContent;
    '#CreateMediaUpload'?: AddCaptionContent;
    '#Play': AddCaptionContent;
    '#SendInvitation': AddCaptionContent;
    '#CopyPresentation': AddCaptionContent;
    '#AddVideoPodcast': AddCaptionContent;
    '#AddExternalPublishing': AddCaptionContent;
    '#ConvertVideoToSlide': AddCaptionContent;
    '#AddCaptionContent': AddCaptionContent;
    '#GetCommentCount': AddCaptionContent;
    '#ResetMedia': AddCaptionContent;
    '#EnableAnnotationCreation': AddCaptionContent;
    '#SetThumbnail': AddCaptionContent;
    '#AddPublishToGo': AddCaptionContent;
    '#SubmitPublishToGo': AddCaptionContent;
    '#RemovePublishToGo': AddCaptionContent;
    '#AddPodcast': AddCaptionContent;
    '#RemovePodcast': AddCaptionContent;
    '#UpdateCommentVisibility': AddCaptionContent;
    '#DeleteComments': AddCaptionContent;
    '#UpdateAnnotationVisibility': AddCaptionContent;
    '#DeleteAnnotations': AddCaptionContent;
    Id: string;
    Title: string;
    Status: Status;
    Source: Source;
    RootId: string;
    RootOwner: string;
    RegistrationRequired: boolean;
    CurrentlyAvailableInShowcase: null;
    ViewableByPlaylistOwner: null;
    Description: null | string;
    RecordDate: Date;
    RecordDateLocal: Date;
    Duration: number;
    NumberOfViews: number;
    Owner: string;
    Creator: string;
    PrimaryPresenter: string;
    ThumbnailUrl: null | string;
    IsLive: boolean;
    CreationDate: Date;
    PlayerId: string;
    PresentationTemplateId: null;
    AlternateName: null;
    CopyrightNotice: null;
    MaximumConnections: number;
    PublishingPointName: null;
    IsUploadAutomatic: boolean;
    TimeZone: TimeZone;
    PollsEnabled: boolean;
    LiveCountdownEnabled: boolean;
    LiveIndicationDelayed: boolean;
    ForumsEnabled: boolean;
    SharingEnabled: boolean;
    PlayerLocked: boolean;
    PollsInternal: boolean;
    Private: boolean;
    NotifyOnMetadataChanged: boolean;
    ApprovalState: ApprovalState;
    ApprovalRequiredChangeTypes: ApprovalRequiredChangeTypes;
    IsApproved: boolean;
    ContentRevision: number;
    PollLink: null;
    ParentFolderName: string;
    ParentFolderId: string;
    DisplayRecordDate: Date;
    IsLiveEnabled: boolean;
    PlayStatus: PlayStatus;
    CustomFieldValues: CustomFieldValue[];
    TagList: any[];
    IsHeadRevisionContentComplete: boolean;
    TotalFileLength: string;
    ExternalLinks: any[];
    Streams: Stream[];
    UseAdaptiveCapture: boolean;
    AnnotationMode: AnnotationMode;
    InheritPermissions: boolean;
    ThumbnailGenerateOption: ThumbnailGenerateOption;
    IsDvrPlaybackEnabled: boolean;
    DvrBufferDurationMaximum: null;
    IsExternalVideo: boolean;
    HasQuizzes: boolean;
    ExternalVideoData: ExternalVideoData;
    MosaicRecorderSessionId: null;
}

export interface AddCaptionContent {
    target: string;
}

export enum AnnotationMode {
    Open = 'Open',
}

export enum ApprovalRequiredChangeTypes {
    DefaultApprovalChangesDefaultNotificationChanges = 'DefaultApprovalChanges, DefaultNotificationChanges',
}

export enum ApprovalState {
    Approved = 'Approved',
}

export interface CustomFieldValue {
    FieldName: FieldName;
    FieldDefinitionId: string;
    DataType: DataType;
    Value: string;
}

export enum DataType {
    Boolean = 'Boolean',
    String = 'String',
}

export enum FieldName {
    SyllabusPlusVideoLectureID = 'SyllabusPlusVideoLectureId',
    SyllabusPlusVideoLectureIsLive = 'SyllabusPlusVideoLectureIsLive',
}

export interface ExternalVideoData {
    ExternalVideoUrl: null;
    ExternalVideoThumbnailUrl: null;
    AuthorName: null;
    AuthorUrl: null;
}

export enum PlayStatus {
    NotAvailable = 'NotAvailable',
    OnDemand = 'OnDemand',
    ScheduledForLive = 'ScheduledForLive',
}

export enum Source {
    HardwareRecorder = 'HardwareRecorder',
    MediaUpload = 'MediaUpload',
    None = 'None',
}

export enum Status {
    Offline = 'Offline',
    Record = 'Record',
    Viewable = 'Viewable',
    Recorded = 'Recorded',
    ViewableOnDemand = 'ViewableOnDemand',
    OpenForRecord = 'OpenForRecord',
    Live = 'Live',
    Transcoding = 'Transcoding',
    Recording = 'Recording',
    Unavailable = 'Unavailable',
}

export interface Stream {
    StreamType: StreamType;
    StreamName: null | string;
}

export enum StreamType {
    Video1 = 'Video1',
    Video2 = 'Video2',
}

export enum ThumbnailGenerateOption {
    CaptureApplicationDefault = 'CaptureApplicationDefault',
    None = 'None',
}

export enum TimeZone {
    WEuropeStandardTime = 'W. Europe Standard Time',
}
