export class CreateCampaignRequestModel {
  name: string;
  type: string;
  status: string;
  workflowId: string;
  agentIds: string;
  description: string;
  customerType: string;
  segmentQuery: string;
  outboundNumber: string;
  startCallTime: Date;
  endCallTime: Date;
  timeFrom: string;
  timeTo: string;
  campaignScriptId: string;
  maximumAttempts: 0;
  minimumRetryTime: 0;
  linePerAgent: 0
}
