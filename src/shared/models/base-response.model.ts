export class BaseResponse<T> {
  statusCode: number;
  message: string;
  data?: T[] | undefined | null;
  users?: Map<string, { id: string; username: string; userFullName: string }>;
  total?: number | undefined | null;
}

export class SingleResponse<T> {
  statusCode: number;
  message: string;
  data?: T | undefined | null
}

export class PageResponse<T> {
  statusCode: number;
  message: string;
  data: PagedContent<T>
}


export class PagedContent<T> {

  content: Array<T>;
  pageSize: number;
  totalPages: number;
  totalElements: number;

}
