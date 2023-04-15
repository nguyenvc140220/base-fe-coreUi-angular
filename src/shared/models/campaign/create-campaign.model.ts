export class CreateCampaignModel {
  campaignName: string;
  campaignType: string;
  assignedUser: string;
  description: string;
  checkDupPhone: boolean;
  dataContactType: string;
  segmentQuery: object;
}
