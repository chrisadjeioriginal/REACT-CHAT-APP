export function LogoutMessageBoxButtonHolder({ children }) {
  const style = {
    width: "100%",
    height: "30px",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  };

  return <div style={style}>{children}</div>;
}
