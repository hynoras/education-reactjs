export interface TanStackQueryOptions {
  data: any
  isLoading: boolean
  isError?: boolean
}

export interface ParamsOptions {
  currentPage: number
  pageSize: number
  sortBy: string
  sortOrder: string
}
