export function AddButton({ setAddButtonPressed }) {
  function pressAddButton() {
    setAddButtonPressed(true);
  }

  const style = {
    width: "60px",
    height: "60px",
    borderRadius: "30px",
    background:
      "linear-gradient(to bottom ,rgb(184, 251, 129), rgb(22, 255, 1))",
    border: "4px inset black",
    position: "relative",
    marginLeft: "auto",
    right: "100px",
    top: "50px",
    cursor: "pointer",
    backgroundColor: "none",
  };
  return (
    <button style={style} onClick={pressAddButton}>
      +
    </button>
  );
}
