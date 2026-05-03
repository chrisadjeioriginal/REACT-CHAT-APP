export function Message({ messages, username }) {
  return (
    <>
      {messages.map((message) => (
        <p
          key={message.id}
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
            alignSelf: message.sender === username ? "flex-end" : "flex-start",
            padding: "5px",
            // marginRight: "10px",
            borderRadius: "10px",
            wordBreak: "break-word",
            fontFamily: "Arial",
            fontSize: "25px",
            left: message.sender === username ? "-10px" : "10px",
          }}
        >
          {message.content}
        </p>
      ))}
    </>
  );
}
