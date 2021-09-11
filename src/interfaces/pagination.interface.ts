export interface PaginationOptions {
  page: number
  pageSize: number
}

export const defaultPaginationOptions: PaginationOptions = {
  page: 1,
  pageSize: 10,
}
