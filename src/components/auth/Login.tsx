import "./style.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"

const Login = () => {
  return (
    <body>
      <div className={"login-container"}>
        <form className={"login-form"}>
          <h2>Login</h2>
          <div>
            <input type="text" placeholder="Username" required />
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <input type="text" placeholder="Username" required />
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="forget-password-link">
            <a href="#">Forget password?</a>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </body>
  )
}

export default Login
