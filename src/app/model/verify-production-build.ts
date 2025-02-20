export class VerifyProductionBuildReq {
    id: string;
    maps: string;
    partitionGroup: string;
    extractId: string; 
    refN: string;
    proposedProjectNumber: string;
    builtDateTime: string;
    builtStatus: string;
    builtSeverity: string;   
    promotedDateTime: string;    
    promotedBy: string;
    errorLog: string;
  
    constructor(
        id: string,
        maps: string,
        partitionGroup: string,
        extractId: string, 
        refN: string,
        proposedProjectNumber: string,
        builtDateTime: string,
        builtStatus: string,
        builtSeverity: string,
        promotedDateTime: string,       
        promotedBy: string,
        errorLog: string,
    ) {
        this.id = id;
        this.maps = maps;
        this.partitionGroup = partitionGroup;
        this.extractId = extractId;
        this.refN = refN;
        this.proposedProjectNumber = proposedProjectNumber;
        this.builtDateTime = builtDateTime;
        this.builtStatus = builtStatus;
        this.builtSeverity = builtSeverity;
        this.promotedDateTime = promotedDateTime;        
        this.promotedBy = promotedBy;
        this.errorLog = errorLog;
    }
}  