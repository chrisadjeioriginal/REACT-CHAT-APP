export function Message({ username, messageStore, convoId }) {
  // console.log("the recipient is ", recipient);
  const display = messageStore.filter((msg) => msg.convoId === convoId);
  // console.log(display);

  return (
    <>
      {display.map((msg, i) => (
        <p
          key={i}
          style={{
            backgroundColor: "rgb(179, 252, 83)",
            position: "relative",
            display: "flex",
            flexdirection: "column",
            color: "rgb(0, 0, 0)",
            // minHeight: "40px",
            width: "fit-content",
            maxWidth: "45%",
            justifyContent: "right",
            alignSelf: msg.sender === username ? "flex-end" : "flex-start",
            padding: "5px",
            // marginRight: "10px",
            borderRadius: "10px",
            wordBreak: "break-word",
            fontFamily: "Arial",
            fontSize: "25px",
            left: msg.sender === username ? "-10px" : "10px",
          }}
        >
          {msg.content}
        </p>
      ))}
    </>
  );
}
