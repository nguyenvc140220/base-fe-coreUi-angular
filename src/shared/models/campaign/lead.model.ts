export interface LeadModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  campaignId: string;
  tenant: string;
  contactId: string;
  attemps: number;
}
