import { Input } from "antd"
import { useState } from "react"

const { Search } = Input

interface SearchBarProps {
  onSearch: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchQuery.trim())
  }

  return (
    <Search
      placeholder="Search student identity, name..."
      value={searchQuery}
      onChange={handleChange}
      onSearch={handleSearch}
      enterButton
    />
  )
}

export default SearchBar
