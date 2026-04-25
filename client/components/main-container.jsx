export function MainContainer({ children }) {
  const style = {
    width: "100%",
    height: "90%",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    top: "100px",
  };
  return <div style={style}>{children}</div>;
}
