export function SendButton({ setMessages, text, setText, setfinalText }) {
  function sendMessage() {
    if (text.trim()) {
      const messageBody = {
        content: text.trim(),
        id: crypto.randomUUID(),
        date: new Date(),
      };
      console.log(messageBody);
      // setMessages((prev) => [...prev, messageBody]);
      setfinalText(messageBody);
      setText("");
    }
  }

  const style = { width: "50px", height: "50px", borderRadius: "25px" };
  return (
    <button style={style} onClick={sendMessage}>
      SEND
    </button>
  );
}
