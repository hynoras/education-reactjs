import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

export const LoginButton = styled(Button)({
  width: "100%",
  height: "48px",
  backgroundColor: "#7494ec",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, .1)",
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
  margin: "10px 0",
  fontFamily: "'Poppins', sans-serif",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5a7fde"
  }
})

export const SubmitButton = styled(Button)({
  width: "10%",
  height: "48px",
  backgroundColor: "#7494ec",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, .1)",
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
  margin: "10px 0",
  fontFamily: "'Poppins', sans-serif",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5a7fde"
  }
})
