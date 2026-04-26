export function TypingArea({ setText, text }) {
  function UpdateTextContent(e) {
    setText(e.target.value);
  }

  const style = {
    width: "70%",
    height: "50%",
    borderRadius: "10px",
    border: "1px solid black",
    // backgroundColor: "rgba(72, 123, 76, 0.58)",
    outline: "5px inset green",

    color: "black",
    fontSize: "20px",
  };

  return (
    <input style={style} onChange={UpdateTextContent} value={text}></input>
  );
}
