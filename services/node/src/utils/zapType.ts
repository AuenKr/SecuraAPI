export interface zapActiveScanParamsType {
  url?: string;
  recurse?: string;
  inScopeOnly?: string;
  scanPolicyName?: string;
  method?: string;
  postData?: string;
  contextId?: string;
}

export interface zapActiveScanReportType {
  sourceid?: string;
  other?: string;
  method?: string;
  evidence?: string;
  pluginId?: string;
  cweid?: string;
  confidence?: string;
  wascid?: string;
  description?: string;
  messageId?: string;
  inputVector?: string;
  url?: string;
  tags: [any], // object
  reference?: string;
  solution?: string;
  alert?: string;
  param?: string;
  attack?: string;
  name?: string;
  risk?: string;
  id?: string;
  alertRef?: string;
}

export interface zapActiveScanResultType {
  alerts: zapActiveScanReportType[]
}