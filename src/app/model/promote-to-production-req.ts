export class PromoteToProductionReq {
    id: string;
    maps: string;
    partitionGroup: string;
    extractId: string;
    builtDateTime: string;
    builtStatus: string;
    builtSeverity: string;
    promotedBy: string;
    promotedDateTime: string;
    sentBy: string;
    sentDateTime: string;
    refN: string;
    proposedProjectNumber: string;
  
    constructor(
        id: string,
        maps: string,
        partitionGroup: string,
        extractId: string,
        builtDateTime: string,
        builtStatus: string,
        builtSeverity: string,
        promotedBy: string,
        promotedDateTime: string,
        sentBy: string,
        sentDateTime: string,
        refN: string,
        proposedProjectNumber: string
    ) {
        this.id = id;
        this.maps = maps;
        this.partitionGroup = partitionGroup;
        this.extractId = extractId;
        this.builtDateTime = builtDateTime;
        this.builtStatus = builtStatus;
        this.builtSeverity = builtSeverity;
        this.promotedBy = promotedBy;
        this.promotedDateTime = promotedDateTime;
        this.sentBy = sentBy;
        this.sentDateTime = sentDateTime;
        this.refN = refN;
        this.proposedProjectNumber = proposedProjectNumber;
    }
  }  