export class BaseResponse<T> {
  statusCode: number;
  message: string;
  data?: T[] | undefined | null;

  total?: number | undefined | null;
}
