import AvatarUpload from "shared/components/data_entry/input/AvatarUpload"
import "./style.scss"

type AvatarOptionProps = {
  studentId: string | undefined
  preview?: boolean | undefined
}

const AvatarOption: React.FC<AvatarOptionProps> = ({ studentId }) => {
  return (
    <>
      <p>Placeholder</p>
      <AvatarUpload studentId={studentId} />
    </>
  )
}

export default AvatarOption
