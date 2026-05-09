export function SendButton({
  recipient,
  text,
  setText,
  setfinalText,
  username,
  convoId,
}) {
  function sendMessage() {
    if (text.trim()) {
      const messageBody = {
        content: text.trim(),
        // id: crypto.randomUUID(),
        // date: new Date(),
        recipient: recipient,
        sender: username,
        convoId: convoId,
      };
      console.log(messageBody);
      // setMessages((prev) => [...prev, messageBody]);
      if (messageBody.recipient) {
        setfinalText(messageBody);
      } else {
        console.log("please choose recipient");
      }
      // setfinalText(messageBody);
    }

    setText("");
  }

  const style = { width: "50px", height: "50px", borderRadius: "25px" };
  return (
    <button style={style} onClick={sendMessage}>
      SEND
    </button>
  );
}
