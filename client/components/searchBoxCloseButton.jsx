export function SearchBoxCloseButton({ setAddButtonPressed }) {
  function closeSearchBox() {
    setAddButtonPressed(false);
  }
  const style = {
    width: "30px",
    height: "30px",
    borderRadius: "20px",
    background:
      "linear-gradient(to right ,rgb(127, 120, 120), rgb(255, 255, 255))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: "170px",

    border: "2px ridge gray",
    cursor: "pointer",
  };
  return (
    <div style={style} onClick={closeSearchBox}>
      X
    </div>
  );
}
