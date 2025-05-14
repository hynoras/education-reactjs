import { useNavigate } from "react-router"

const useNavigateHook = (route: string) => {
  const navigate = useNavigate()
  return navigate(route)
}
export default useNavigateHook
