export class ExtractRequest{

    id: string;
    requestId: string;
    extractId: string;
    requestDateTime: string;
    requestedBy: string;
    maps: string;
    partitionGroup: string;
    estimatedDateTime: string;
    completionDateTime: string;
    requestStatus: string;

    constructor(
        id: string,
        requestId: string,
        extractId: string,
        requestDateTime: string,
        requestedBy: string,
        maps: string,
        partitionGroup: string,
        estimatedDateTime: string,
        completionDateTime: string,
        requestStatus: string
    ){
        this.id = id;
        this.requestId = requestId;
        this.extractId = extractId;
        this.requestDateTime = requestDateTime;
        this.requestedBy = requestedBy;
        this.maps = maps;
        this.partitionGroup = partitionGroup;
        this.estimatedDateTime = estimatedDateTime;
        this.completionDateTime = completionDateTime;
        this.requestStatus = requestStatus;
    }

}
