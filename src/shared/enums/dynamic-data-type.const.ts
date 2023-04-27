export enum DynamicTypeEnum {
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  DATETIME = 'DATETIME',
  TIME = 'TIME',
  CHECKLIST = 'CHECKLIST',
  DROPLIST = 'DROPLIST',
  RADIO = 'RADIO',
}

export const DYNAMIC_PROPERTY_TYPE: {
  label: string;
  value: DynamicTypeEnum;
}[] = [
  {
    label: 'Văn bản',
    value: DynamicTypeEnum.TEXT
  },
  {
    label: 'Email',
    value: DynamicTypeEnum.EMAIL
  },
  {
    label: 'Số điện thoại',
    value: DynamicTypeEnum.PHONE_NUMBER
  },
  {
    label: 'Số',
    value: DynamicTypeEnum.NUMBER
  },
  {
    label: 'Ngày',
    value: DynamicTypeEnum.DATE
  },
  {
    label: 'Ngày giờ',
    value: DynamicTypeEnum.DATETIME
  },
  {
    label: 'Giờ',
    value: DynamicTypeEnum.TIME
  },
  {
    label: 'Ô chọn (checklist)',
    value: DynamicTypeEnum.CHECKLIST
  },
  {
    label: 'Danh sách chọn (droplist)',
    value: DynamicTypeEnum.DROPLIST
  },
  {
    label: 'Nút radio',
    value:DynamicTypeEnum.RADIO
  },
];
