export class BackendBaseResponse<T> {
  statusCode: number;
  message: string;
  data?: T | undefined | null;
}
