import { MainContainer } from "./main-container.jsx";
import { ChatList } from "./chat-list.jsx";
import { ChatWindow } from "./chat-window.jsx";
import { InputContainer } from "./input-conatiner.jsx";
import { MessageContainer } from "./message-container.jsx";
import { TypingArea } from "./typing-area.jsx";
import { SendButton } from "./send-button.jsx";
import { AttachmentButton } from "./attachment-button.jsx";
import { Header } from "./header.jsx";
import { SubContainer } from "./sub-container.jsx";
import { AddButton } from "./addButtom.jsx";
import { useState } from "react";
import { Message } from "./message.jsx";

export function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  return (
    <MainContainer>
      <Header>
        <AddButton />
      </Header>
      <SubContainer>
        <ChatList />
        <ChatWindow>
          <MessageContainer>
            <Message messages={messages} />
          </MessageContainer>
          <InputContainer>
            <AttachmentButton />
            <TypingArea setText={setText} text={text} />
            <SendButton
              setMessages={setMessages}
              text={text}
              setText={setText}
              messages={messages}
            />
          </InputContainer>
        </ChatWindow>
      </SubContainer>
    </MainContainer>
  );
}
