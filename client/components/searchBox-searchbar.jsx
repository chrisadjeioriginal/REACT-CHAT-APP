export function SearchBar() {
  const style = {
    width: "300px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "25px",
    position: "relative",
    top: "-30px",
    border: "5px inset green",
    fontFamily: "arial",
  };
  return (
    <input
      style={style}
      placeholder="Example: Chrisadjeioriginal2@yahoo.com"
    ></input>
  );
}
