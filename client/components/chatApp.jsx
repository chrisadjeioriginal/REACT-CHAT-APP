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
import { useState, useEffect, useRef } from "react";
import { Message } from "./message.jsx";
import { io } from "socket.io-client";
import { UsernameHolder } from "./username-holder.jsx";
import { SearchBox } from "./searchbox.jsx";
import { SearchBar } from "./searchBox-searchbar.jsx";
import { SearchBoxMessageHolder } from "./searchBoxMessageHolder.jsx";
import { SearchBoxCloseButton } from "./searchBoxCloseButton.jsx";
import { SearchBoxSearchButton } from "./searchBox-searchButton.jsx";
import { FriendsHolder } from "./friendsHolder.jsx";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [finalText, setfinalText] = useState();
  const [username, setUsername] = useState("");

  const [addButtonPressed, setAddButtonPressed] = useState(false);

  const [searchBoxText, setSearchBoxText] = useState("");
  // const [finalsearchBoxText, setFinalSearchBoxText] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const clientRef = useRef(null);

  useEffect(() => {
    async function userIsOnline() {
      try {
        const res = await axios.get("http://localhost:3000/Online", {
          withCredentials: true,
        });

        if (!res.data.success) {
          navigate("/");
        } else {
          setUsername(res.data.userId);
        }
      } catch (err) {
        navigate("/");
      }
    }

    userIsOnline();
  }, []);

  useEffect(() => {
    if (!username) {
      return;
    }
    const client = io("http://localhost:3000", { withCredentials: true });

    clientRef.current = client;

    client.on("connect", () => {
      console.log("I have connected from react front end");

      client.emit("join-room", { username: username });

      client.on("message", (msg) => {
        console.log(`sender was ${msg.sender}`);
        setMessages((prev) => [...prev, msg]);
      });
    });

    return () => client.disconnect();
  }, [username]);

  useEffect(() => {
    if (!finalText) {
      return;
    }
    clientRef.current.emit("message", finalText);
  }, [finalText]);

  useEffect(() => {
    async function getFriends() {
      const response = await axios.get("http://localhost:3000/Friends", {
        withCredentials: true,
      });

      if (response.data.friendsInfo) {
        setFriendsList(response.data.friendsInfo);
      }
    }
    getFriends();
  });

  return (
    <MainContainer>
      {addButtonPressed && (
        <SearchBox>
          <SearchBoxCloseButton setAddButtonPressed={setAddButtonPressed} />
          <SearchBoxMessageHolder />
          <SearchBar
            setSearchBoxText={setSearchBoxText}
            searchBoxText={searchBoxText}
          />
          <SearchBoxSearchButton
            searchBoxText={searchBoxText}
            setSearchBoxText={setSearchBoxText}
            setFriendsList={setFriendsList}
          />
        </SearchBox>
      )}
      <UsernameHolder username={username} />
      <Header>
        <AddButton setAddButtonPressed={setAddButtonPressed} />
      </Header>
      <SubContainer>
        <ChatList>
          <FriendsHolder friendsList={friendsList} />
        </ChatList>
        <ChatWindow>
          <MessageContainer>
            <Message messages={messages} username={username} />
          </MessageContainer>
          <InputContainer>
            <AttachmentButton />
            <TypingArea setText={setText} text={text} />
            <SendButton
              setMessages={setMessages}
              text={text}
              setText={setText}
              messages={messages}
              setfinalText={setfinalText}
            />
          </InputContainer>
        </ChatWindow>
      </SubContainer>
    </MainContainer>
  );
}
