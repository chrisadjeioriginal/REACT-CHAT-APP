import { SignUpForm } from "./signupform";
import { Link } from "react-router-dom";
import { LogInLogo } from "./LoginLogo";
import pic from "../assets/vegetation.jpg";

export function SignUp({ children }) {
  const style = {
    width: "400px",
    height: "460px",
    borderRadius: "20px",
    // backgroundColor: "rgba(98, 255, 7, 0.76)",
    // backgroundColor: "rgba(12, 222, 176, 0.76)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    border: "8px ridge  rgba(104, 212, 142, 0.56)",
    backgroundImage: `url(${pic})`,
    backgroundSize: "cover",
  };
  return (
    <div style={style}>
      <LogInLogo />
      <SignUpForm />
      <Link to="/">
        <p>Login</p>
      </Link>
    </div>
  );
}
