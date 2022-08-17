type UnverifiedSighting = {

    sightingId: number;
    organismId: number;
    userId: number;
    pictureUrl: string;
    date: string;
    lat: number;
    long: number;
    userVotes: number;
    userReactions: number;
    organismName: string;
    userName: string;

}

type CreateUnverifiedSighting = {

    organismId: number;
    userId: number;
    pictureUrl: string;
    date: string;
    lat: number;
    long: number;
}

export type { UnverifiedSighting, CreateUnverifiedSighting };

