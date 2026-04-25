import { MainContainer } from "./main-container.jsx";
import { ChatList } from "./chat-list.jsx";
import { ChatWindow } from "./chat-window.jsx";
import { InputContainer } from "./input-conatiner.jsx";
import { MessageContainer } from "./message-container.jsx";
import { TypingArea } from "./typing-area.jsx";

export function App() {
  return (
    <MainContainer>
      <ChatList />
      <ChatWindow>
        <MessageContainer />
        <InputContainer>
          <TypingArea />
        </InputContainer>
      </ChatWindow>
    </MainContainer>
  );
}
