import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';

export const DYNAMIC_DATA_TYPE: {
  label: string;
  value: {
    dataType: DynamicDataTypeEnum;
    inputType: DynamicInputTypeEnum;
  };
}[] = [
  {
    label: 'Văn bản',
    value: {
      dataType: DynamicDataTypeEnum.TEXT,
      inputType: DynamicInputTypeEnum.TEXT_BOX,
    },
  },
  {
    label: 'Email',
    value: {
      dataType: DynamicDataTypeEnum.TEXT,
      inputType: DynamicInputTypeEnum.EMAIL,
    },
  },
  {
    label: 'Số điện thoại',
    value: {
      dataType: DynamicDataTypeEnum.TEXT,
      inputType: DynamicInputTypeEnum.PHONE_NUMBER,
    },
  },
  {
    label: 'Số',
    value: {
      dataType: DynamicDataTypeEnum.TEXT,
      inputType: DynamicInputTypeEnum.NUMBER_BOX,
    },
  },
  {
    label: 'Ngày',
    value: {
      dataType: DynamicDataTypeEnum.DATETIME,
      inputType: DynamicInputTypeEnum.DATE_PICKER,
    },
  },
  {
    label: 'Ngày giờ',
    value: {
      dataType: DynamicDataTypeEnum.DATETIME,
      inputType: DynamicInputTypeEnum.DATETIME_PICKER,
    },
  },
  {
    label: 'Giờ',
    value: {
      dataType: DynamicDataTypeEnum.DATETIME,
      inputType: DynamicInputTypeEnum.TIME_PICKER,
    },
  },
  {
    label: 'Ô chọn (checklist)',
    value: {
      dataType: DynamicDataTypeEnum.LIST,
      inputType: DynamicInputTypeEnum.CHECK_LIST,
    },
  },
  {
    label: 'Danh sách chọn (droplist)',
    value: {
      dataType: DynamicDataTypeEnum.LIST,
      inputType: DynamicInputTypeEnum.SINGLE_SELECT,
    },
  },
  {
    label: 'Nút radio',
    value: {
      dataType: DynamicDataTypeEnum.LIST,
      inputType: DynamicInputTypeEnum.RADIO,
    },
  },
];
