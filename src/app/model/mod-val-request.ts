export class ModValRequest {
    id: string;
    maps: string;
    partitionGroup: string;
    builtDateTime: string;
    builtStatus: string;
    builtSeverity: string;
    extractId: string;
    extractBy: string;
    extractDateTime: string;
    errorLog: string;
  
    constructor(
      id: string,
      maps: string,
      partitionGroup: string,
      builtDateTime: string,
      builtStatus: string,
      builtSeverity: string,
      extractId: string,
      extractBy: string,
      extractDateTime: string,
      errorLog: string
    ) {
      this.id = id;
      this.maps = maps;
      this.partitionGroup = partitionGroup;
      this.builtDateTime = builtDateTime;
      this.builtStatus = builtStatus;
      this.builtSeverity = builtSeverity;
      this.extractId = extractId;
      this.extractBy = extractBy;
      this.extractDateTime = extractDateTime;
      this.errorLog = errorLog;
    }
  }
  