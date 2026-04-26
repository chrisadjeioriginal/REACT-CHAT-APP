export function SendButton({ setMessages, text, setText, messages }) {
  function sendMessage() {
    if (text.trim()) {
      const messageBody = { content: text.trim(), id: crypto.randomUUID() };
      //  console.log(messages);
      setMessages((prev) => [...prev, messageBody]);
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
