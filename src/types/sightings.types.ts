type UnverifiedSighting = {
    sightingId: number;
    organismId: number;
    userId: number;
    pictureURL: string;
    date: string;
    lat: number;
    long: number;
    userVotes: number;
    userReactions: number;
    organismName: string;
    userName: string;

}

export type { UnverifiedSighting };