export interface DynamicQueryModel {
  currentPage?: number;
  pageSize?: number;
  payload?: any;
  index?: string;
  orderByAsc?: string[] | undefined;
  orderByDesc?: string[] | undefined;
}
