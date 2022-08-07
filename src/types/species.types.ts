type Organism = {

    organismId: number;
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureURL: string;
    description: string;
    isProtected: boolean;
    children?: React.ReactNode

}

export type { Organism };