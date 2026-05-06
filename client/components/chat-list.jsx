export function ChatList({ children }) {
  const style = {
    width: "20%",
    height: "90%",
    backgroundColor: "rgba(35, 88, 53, 0.24)",
    marginRight: "40px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    scrollbarWidth: "none",
  };

  return <div style={style}>{children}</div>;
}
