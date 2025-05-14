import { Input } from "antd"
import { useState } from "react"

const { Search } = Input

interface SearchBarProps {
  onSearch: (value: string) => void
  className?: string
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchQuery.trim())
  }

  return (
    <Search
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleChange}
      onSearch={handleSearch}
      enterButton
      className={className}
    />
  )
}

export default SearchBar
