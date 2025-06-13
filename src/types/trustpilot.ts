export interface ReviewCount {
    total: number;
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
}

export interface BusinessInfo {
    stars: number;
    trustScore: number;
    displayName: string;
    numberOfReviews: ReviewCount;
    websiteUrl: string;
    identifyingName: string;
}

export interface Links {
    profileUrl: string;
    evaluateUrl: string;
    evaluateEmbedUrl: string;
}

export interface Translations {
    starRating: string;
    trustpilotCustomWidget: string;
    reviews: string;
    noReviews: string;
}

export interface Settings {
    customStylesAllowed: boolean;
    syndicationEnabled: boolean;
}

export interface Trustpilot {
    businessUnit: BusinessInfo;
    businessEntity: BusinessInfo;
    links: Links;
    starsString: string;
    translations: Translations;
    settings: Settings;
}
