export interface ApiResponse<T = null> {
  status: number;
  message: string;
  data: T | null;
}

export const successResponse = <T>(message: string, data: T): ApiResponse<T> => {
  return {
    status: 0,
    message,
    data,
  };
};

export const errorResponse = (status: number, message: string): ApiResponse => {
  return {
    status,
    message,
    data: null,
  };
};
