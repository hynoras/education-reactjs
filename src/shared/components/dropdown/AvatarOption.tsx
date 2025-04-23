import "./style.scss"
import AvatarUpload from "../input/AvatarUpload"

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
