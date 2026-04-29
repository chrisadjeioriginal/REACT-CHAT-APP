import { SignUpForm } from "./signupform";
import { Link } from "react-router-dom";
import { LogInLogo } from "./LoginLogo";

export function SignUp({ children }) {
  const style = {
    width: "400px",
    height: "460px",
    borderRadius: "20px",
    backgroundColor: "rgba(37, 98, 57, 0.41)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  };
  return (
    <div style={style}>
      <LogInLogo />
      <SignUpForm />{" "}
      <Link to="/">
        <p>Login</p>
      </Link>
    </div>
  );
}
