import { useState, useEffect } from "react"

interface FetchOptions {
  pathParams?: any
  currentPage?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: string
  gender?: string
  major?: string
  department?: string
  searchQuery?: string
}

const useFetch = <T>(fetchFunction: (options?: FetchOptions) => Promise<any>, initialOptions: FetchOptions = {}) => {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [totalElements, setTotalElements] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [options, setOptions] = useState<FetchOptions>({
    pathParams: initialOptions.pathParams ?? undefined,
    currentPage: initialOptions.currentPage ?? 1,
    pageSize: initialOptions.pageSize ?? 10,
    sortBy: initialOptions.sortBy,
    sortOrder: initialOptions.sortOrder,
    gender: initialOptions.gender,
    major: initialOptions.major,
    department: initialOptions.department,
    searchQuery: initialOptions.searchQuery ?? ""
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // let finalFetchFunction = fetchFunction
        // if (options.pathParams && Object.keys(options.pathParams).length > 0) {
        //   finalFetchFunction = (fetchOptions) => fetchFunction({ ...fetchOptions, pathParams: options.pathParams })
        // }
        const response = await fetchFunction(options)
        if (response.data?.content) {
          setData(response.data.content)
          setTotalElements(response.data.total_element)
          setTotalPages(response.data.total_page)
        } else {
          setData(response)
        }
      } catch (err) {
        setError("Failed to fetch data.")
        setData([])
        setTotalElements(0)
        setTotalPages(0)
      }
      setLoading(false)
    }

    fetchData()
  }, [fetchFunction, options])

  return {
    data,
    loading,
    error,
    totalPages,
    totalElements,
    setOptions,
    options
  }
}

export default useFetch
