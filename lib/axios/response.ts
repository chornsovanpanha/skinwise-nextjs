export class AppResponse<T, TError> {
  status?: number;
  data?: T;
  error?: TError;
  totalRecords?: number;
  totalPages?: number;
  page?: number;
  perPage?: number;

  constructor({
    status,
    data,
    error,
    page,
    perPage,
    totalPages,
    totalRecords,
  }: {
    status: number;
    data: T;
    error?: TError;
    totalRecords?: number;
    totalPages?: number;
    page?: number;
    perPage?: number;
  }) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.perPage = perPage;
    this.totalPages = totalPages;
    this.totalRecords = totalRecords;
    this.page = page;
  }
}
