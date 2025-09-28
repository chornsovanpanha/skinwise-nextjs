export interface State<T> {
  loading: boolean;
  error: string;
  success: boolean;
  data?: T;
}

export interface PrismaErrorResponse {
  code: string;
  model?: string;
  cause?: string;
  message?: string;
  clientVersion?: string;
}
