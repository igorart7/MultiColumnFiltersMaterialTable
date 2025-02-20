export class PrevIssuedRequest {
    id: string;
    maps: string;
    referenceNumber: string;
    proposedProjectNumber: string;
    userId: string;
    action: string;
    extractDateTime: string;
    partitionGroup: string;

    constructor(
        id: string,
        maps: string,
        referenceNumber: string,
        proposedProjectNumber: string,
        userId: string,
        action: string,
        extractDateTime: string,
        partitionGroup: string
    ) {
        this.id = id;
        this.maps = maps;
        this.referenceNumber = referenceNumber;
        this.proposedProjectNumber = proposedProjectNumber;
        this.userId = userId;
        this.action = action;
        this.extractDateTime = extractDateTime;
        this.partitionGroup = partitionGroup;
    }
}    