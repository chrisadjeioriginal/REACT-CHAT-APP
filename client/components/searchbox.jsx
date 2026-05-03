export function SearchBox({ children }) {
  const style = {
    width: "400px",
    height: "200px",
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    border: "4px solid rgb(69, 67, 67)",
  };
  return <div style={style}>{children}</div>;
}
