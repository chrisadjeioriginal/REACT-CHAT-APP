import pic from "../assets/exit_button.png";

export function LogoutButton({ setLogoutButtonPressed }) {
  function ShowLogoutMessageBox() {
    setLogoutButtonPressed(true);
  }
  const style = {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "rgb(255, 19, 19)",
    border: "4px outset black",
    cursor: "pointer",
    position: "relative",
    top: "28%",
    left: "1%",
  };
  return (
    <button style={style} onClick={ShowLogoutMessageBox}>
      <img src={pic} style={{ height: "50%" }}></img>
    </button>
  );
}
