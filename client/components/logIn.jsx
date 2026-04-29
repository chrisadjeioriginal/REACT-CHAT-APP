import { LoginForm } from "./loginForm";
import { LogInLogo } from "./LoginLogo";
import { Link } from "react-router-dom";

export function LogIn({ children }) {
  const style = {
    width: "400px",
    height: "460px",
    borderRadius: "20px",
    backgroundColor: "rgba(37, 98, 57, 0.41)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-evenly",
    alignItems: "center",
  };

  const linkStyle = {
    backgroundColor: "rgba(37, 98, 57, 0.41)",
    borderRadius: "3px",
    cursor: "pointer",
  };
  return (
    <div style={style}>
      <LogInLogo />
      <LoginForm />
      <Link to="/SignUp">
        <p style={linkStyle}>Sign Up</p>
      </Link>
    </div>
  );
}
