export function Header({ children }) {
  const style = {
    width: "100%",
    height: "70px",
    // backgroundColor: "rgba(35, 88, 53, 0.24)",
    display: "flex",
    flexDirection: "row",
    marginBottom: "60px",
  };
  return <div style={style}>{children}</div>;
}
