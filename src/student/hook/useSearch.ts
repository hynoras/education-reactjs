import useFetch from "./useFetch"

const useSearch = <T>(fetchFunction: (options?: any) => Promise<any>) => {
  const { data, loading, totalElements, setOptions } = useFetch<T>(fetchFunction)

  const setSearchQuery = (query: string) => {
    setOptions((prev) => ({ ...prev, searchQuery: query, currentPage: 1 }))
  }

  return {
    data,
    loading,
    totalElements,
    setSearchQuery,
    setOptions
  }
}

export default useSearch
