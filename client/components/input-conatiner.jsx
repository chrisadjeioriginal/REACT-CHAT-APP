export function InputContainer({ children }) {
  const style = {
    width: "100%",
    height: "70px",
    backgroundColor: "rgba(22, 19, 12, 0.09)",

    position: "relative",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  return <div style={style}>{children}</div>;
}
