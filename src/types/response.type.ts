export type Response<T extends object> = {
  data: ResponseData<T>;
  pagination?: { count: ResponsePagination };
};

export type ResponseData<T extends object | object[]> = T;

export type ResponsePagination = { count: number };
