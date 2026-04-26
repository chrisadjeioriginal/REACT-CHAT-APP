export function MainContainer({ children }) {
  const style = {
    width: "100%",
    height: "100%",

    // flexDirection: "column",
    position: "relative",
    top: "0px",
  };
  return <div style={style}>{children}</div>;
}
