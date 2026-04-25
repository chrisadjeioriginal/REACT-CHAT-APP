export function ChatWindow({ children }) {
  const style = {
    width: "75%",
    height: "90%",
    backgroundColor: "rgba(35, 88, 53, 0.24)",
    // background: "linear-gradient( to right , rgb(56, 81, 64), rgb(70, 112, 85)",
    display: "flex",
    flexDirection: "column",
  };

  return <div style={style}>{children}</div>;
}
