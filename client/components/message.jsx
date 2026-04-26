export function Message({ messages }) {
  const style2 = {
    backgroundColor: "rgb(179, 252, 83)",
    position: "relative",
    display: "flex",
    flexdirection: "column",
    color: "rgb(0, 0, 0)",
    minHeight: "40px",
    width: "fit-content",
    maxWidth: "45%",
    justifyContent: "right",
    marginLeft: "auto",
    padding: "5px",
    marginRight: "10px",
    borderRadius: "10px",
    wordBreak: "break-word",
    fontFamily: "Arial",
    fontSize: "25px",
  };

  return (
    <>
      {messages.map((message) => (
        <p key={message.id} style={style2}>
          {message.content}
        </p>
      ))}
    </>
  );
}
