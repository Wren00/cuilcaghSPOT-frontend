type Organism = {

    organismId: number;
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureUrl: string;
    description: string;
    isProtected: boolean;
    children?: React.ReactNode

}

export type { Organism };