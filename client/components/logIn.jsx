import { LoginForm } from "./loginForm";
import { LogInLogo } from "./LoginLogo";
import { Link } from "react-router-dom";
import image from "../assets/flowers2.png";

export function LogIn({ children }) {
  const style = {
    width: "400px",
    height: "460px",
    borderRadius: "20px",
    // backgroundColor: "rgba(37, 98, 57, 0.41)",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    border: "8px ridge rgba(97, 247, 254, 0.41)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-evenly",
    alignItems: "center",

    color: "rgb(255, 255, 255)",
    textShadow: "1px 1px 0px black",
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
