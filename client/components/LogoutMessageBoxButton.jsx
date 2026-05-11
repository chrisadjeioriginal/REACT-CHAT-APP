export function LogoutMessageBoxButton({ message, colour, task }) {
  const style = {
    width: "20%",
    backgroundColor: colour,
    position: "relative",
    borderRadius: "10px",
    border: "2px inset white",
    cursor: "pointer",
  };

  return (
    <button style={style} onClick={task}>
      {message}
    </button>
  );
}
