import { DynamicFilterOperatorEnum } from '@shared/enums/dynamic-filter-operator.enum';

export const DYNAMIC_FILTER_FORMAT: {
  label: string;
  value: DynamicFilterOperatorEnum;
}[] = [
  { label: 'Trùng khớp', value: DynamicFilterOperatorEnum.MATCH },
  { label: 'Multi Match', value: DynamicFilterOperatorEnum.MULTI_MATCH },
  { label: 'Bằng', value: DynamicFilterOperatorEnum.EQ },
  { label: 'Không bằng', value: DynamicFilterOperatorEnum.NE },
  { label: 'Lớn hơn', value: DynamicFilterOperatorEnum.GT },
  { label: 'Lớn hơn hoặc bằng', value: DynamicFilterOperatorEnum.GTE },
  { label: 'Nhỏ hơn', value: DynamicFilterOperatorEnum.LT },
  { label: 'Nhỏ hơn hoặc bằng', value: DynamicFilterOperatorEnum.LTE },
  { label: 'Nằm trong', value: DynamicFilterOperatorEnum.IN },
  { label: 'Không nằm trong', value: DynamicFilterOperatorEnum.NIN },
  { label: 'Trong khoảng', value: DynamicFilterOperatorEnum.BETWEEN },
  { label: 'Bao gồm', value: DynamicFilterOperatorEnum.CONTAIN },
  { label: 'Không có giá trị', value: DynamicFilterOperatorEnum.NULL },
  { label: 'Có giá trị', value: DynamicFilterOperatorEnum.NOT_NULL },
];
