export class LogReportRequest {
    id: string;
    extractId: string;
    extractDateTime: string;
    partitionGroup: string;
    maps: string;
    extractBy: string;
    modValBuiltDateTime: string;
    modValBuiltStatus: string;
    modValBuiltSeverity: string;
    dgoWta: string;
    proposedProjectNumber: string;
    sentBy: string;
    sentDateTime: string;
    promotedBy: string;
    promotedDateTime: string;
    prdBuiltDateTime: string;
    prdBuiltStatus: string;
    prdBuiltSeverity: string;
    workFlowStatus: string;
    modValErrorLog: string;
    prdErrorLog: string;

    constructor(
        id: string,
        extractId: string,
        extractDateTime: string,
        partitionGroup: string,
        maps: string,
        extractBy: string,
        modValBuiltDateTime: string,
        modValBuiltStatus: string,
        modValBuiltSeverity: string,
        dgoWta: string,
        proposedProjectNumber: string,
        sentBy: string,
        sentDateTime: string,
        promotedBy: string,
        promotedDateTime: string,
        prdBuiltDateTime: string,
        prdBuiltStatus: string,
        prdBuiltSeverity: string,
        workFlowStatus: string,
        modValErrorLog: string,
        prdErrorLog: string
    ){
        this.id = id;
        this.extractId = extractId;
        this.extractDateTime = extractDateTime;
        this.partitionGroup = partitionGroup;
        this.maps = maps;
        this.extractBy = extractBy;
        this.modValBuiltDateTime = modValBuiltDateTime;
        this.modValBuiltStatus = modValBuiltStatus;
        this.modValBuiltSeverity = modValBuiltSeverity;
        this.dgoWta = dgoWta;
        this.proposedProjectNumber = proposedProjectNumber;
        this.sentBy = sentBy;
        this.sentDateTime = sentDateTime;
        this.promotedBy = promotedBy;
        this.promotedDateTime = promotedDateTime;
        this.prdBuiltDateTime = prdBuiltDateTime;
        this.prdBuiltStatus = prdBuiltStatus;
        this.prdBuiltSeverity = prdBuiltSeverity;
        this.workFlowStatus = workFlowStatus;
        this.modValErrorLog = modValErrorLog;
        this.prdErrorLog = prdErrorLog;
    }
}