import { PaginationOptions } from 'interfaces/pagination.interface'

export const paginate = <T>(arr: T[], options: PaginationOptions) => {
  const start = (options.page - 1) * options.pageSize
  const end = start + options.pageSize
  return arr.slice(start, end)
}
