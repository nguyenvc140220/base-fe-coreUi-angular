export interface CampaignListModel {

  id: string;
  name: string;
  code: string;
  createdAt: number;
  updatedAt: number;
  description: string;
  channelType: string;
  campaignType: string;
  isEnable: boolean;
  channel: string;
  outboundNumber: string;
  minimumRetryTime: number;
  campaignScriptId: string;
  realStartTime: Date;
  realEndTime: Date;
  campaignStatus: string;
  agentIds: string;
  segmentations: string[];
  numOfAgents: number;
}
