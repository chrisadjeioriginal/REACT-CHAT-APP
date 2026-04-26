export function SubContainer({ children }) {
  const style = {
    width: "100%",
    height: "90%",
    display: "flex",
  };
  return <div style={style}>{children}</div>;
}
