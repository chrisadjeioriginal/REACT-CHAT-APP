import logo from "../assets/parrotimage.png";

export function LogInLogo() {
  const style = {
    width: "30px",
    height: "30px",
    marginTop: "10px",
    marginBottom: "10px",
  };
  return <img src={logo} style={style} />;
}
