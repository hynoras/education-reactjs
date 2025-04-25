import { useEffect, useRef } from "react"

type OutsideDetecterProps = {
  children: React.ReactNode
  action: () => void
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const useDetectOutsideClick = (action: () => void, ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [action, ref])
}

const OutsideDetecter: React.FC<OutsideDetecterProps> = ({ children, action, onClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useDetectOutsideClick(action, wrapperRef)

  return (
    <div onClick={onClick} ref={wrapperRef}>
      {children}
    </div>
  )
}

export default OutsideDetecter
