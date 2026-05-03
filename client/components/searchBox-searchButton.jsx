export function SearchBoxSearchButton() {
  const style = {
    width: "20%",
    background:
      "linear-gradient(to right ,rgb(145, 255, 108), rgb(40, 202, 40))",
    position: "relative",
    borderRadius: "10px",
    border: "2px inset white",
    cursor: "pointer",
  };
  return <button style={style}>➤</button>;
}
