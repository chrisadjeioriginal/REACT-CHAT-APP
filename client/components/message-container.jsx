export function MessageContainer({ children }) {
  const style = {
    width: "100%",
    height: "100%",
    overflow: "scroll",

    // background: "linear-gradient( to right , rgb(56, 81, 64), rgb(70, 112, 85)",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "red",
  };

  return <div style={style}>{children}</div>;
}
