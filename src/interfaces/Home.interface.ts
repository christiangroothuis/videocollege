export interface Home {
    'odata.metadata': string;
    'odata.id': string;
    'NowPlaying@odata.navigationLinkUrl': string;
    'RecentlyViewed@odata.navigationLinkUrl': string;
    '#ChangePassword': ChangePassword;
    ApiVersion: string;
    ApiPublishedDate: string;
    SiteName: string;
    SiteDescription: string;
    SiteVersion: string;
    SiteBuildNumber: string;
    SiteOwner: string;
    SiteOwnerContact: string;
    SiteOwnerEmail: string;
    TrustRolePrefix: string | null;
    TrustFriendlyName: string | null;
    HasCreateTrusts: boolean;
    SiteRootUrl: string;
    ServiceRootUrl: string;
    ServerTime: string;
    LoggedInUserName: string | null;
    RootFolderId: string | null;
    ActiveCustomMetadata: string[];
    MaximumConnections: number | null;
    PerUserConnectionLimit: number | null;
}

export interface ChangePassword {
    target: string;
}
