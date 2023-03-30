export class PropertiesBaseResponseModel<T> {

  data?: PropertiesResponseModel;
  statusCode: number;
  message: string
}

export class PropertiesResponseModel {
  content?: PropertyModel[] | undefined | null;
  pageNumber: number;
  pageSize: number;
  totalPages?: number | undefined | null;
  totalElements: number;
}

export class PropertyModel {
  id: string;
  creationTime: number;
  createdBy: string;
  lastModificationTime: number;
  lastModificationBy: number;
  deletedTime: number;
  deletedBy: string;
  code: string;
  displayName: string;
  dataType: string;
  editable: boolean;
  removeable: boolean;
  validators: Object;
}
