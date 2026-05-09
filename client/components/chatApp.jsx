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

  const [recipient, setRecipient] = useState("");

  const [convoId, setConvoId] = useState("");

  const [messageStore, setMessageStore] = useState([]);

  const [friendsLookup, setFriendsLookup] = useState({});

  const clientRef = useRef(null);
  const friendsLookUpRef = useRef({});

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
        console.log(`message being added to message store is: ${msg.content}`);
        console.log(`sender was ${msg.sender}`);
        setMessageStore((prev) => [...prev, msg]);

        // console.log("HEYYYYYY");
        // console.log(friendsLookup[msg.sender]);

        if (!friendsLookUpRef.current[msg.sender] && msg.sender !== username) {
          async function AddToFriendsList() {
            try {
              console.log("ABOUT TO SEND REQUEST");
              const response = await axios.post(
                "http://localhost:3000/Users",
                {
                  friendName: msg.sender,
                  convoId: msg.convoId,
                  myName: username,
                },
                { withCredentials: true },
              );

              if (response.data.success) {
                setFriendsList((prev) => [
                  ...prev,
                  { convoId: msg.convoId, friend: msg.sender },
                ]);

                setFriendsLookup((prev) => {
                  if (prev[msg.sender] || msg.sender === username) return prev;

                  return { ...prev, [msg.sender]: true };
                });
              }
            } catch (error) {
              console.log("couldnt add friend");
              console.log("YES YOU!!");
            }
          }
          AddToFriendsList();
        }
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
    if (!username) return;
    async function getFriends() {
      // console.log("ABOUT TO SEND REQUEST");
      const response = await axios.post(
        "http://localhost:3000/Friends",
        { myName: username },
        {
          withCredentials: true,
        },
      );

      if (response.data.friendsInfo.length > 0) {
        setFriendsList(response.data.friendsInfo);
        setConvoId(response.data.friendsInfo[0].convoId);

        setFriendsLookup((prev) => {
          const updatedLookup = { ...prev };

          response.data.friendsInfo.forEach((item) => {
            updatedLookup[item.friend] = true;
          });

          // console.log("UPDATED LOOKUP:", updatedLookup);

          return updatedLookup;
        });
      }
    }

    getFriends();
  }, [username]);

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get("http://localhost:3000/Messages", {
          withCredentials: true,
        });

        if (response.data.allMessages) {
          setMessageStore(response.data.allMessages);
        }
      } catch (err) {
        console.log("ERROR WHILE RETRIEVING MESSAGES");
      }
    }
    getMessages();
  }, []);

  useEffect(() => {
    friendsLookUpRef.current = friendsLookup;
  }, [friendsLookup]);

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
            setConvoId={setConvoId}
            setRecipient={setRecipient}
            username={username}
          />
        </SearchBox>
      )}
      <UsernameHolder username={username} />
      <Header>
        <AddButton setAddButtonPressed={setAddButtonPressed} />
      </Header>
      <SubContainer>
        <ChatList>
          <FriendsHolder
            friendsList={friendsList}
            setRecipient={setRecipient}
            setMessages={setMessages}
            messageStore={messageStore}
            setConvoId={setConvoId}
            convoId={convoId}
          />
        </ChatList>
        <ChatWindow>
          <MessageContainer>
            <Message
              // messages={messages}
              username={username}
              messageStore={messageStore}
              // recipient={recipient}
              convoId={convoId}
            />
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
              convoId={convoId}
              username={username}
              recipient={recipient}
            />
          </InputContainer>
        </ChatWindow>
      </SubContainer>
    </MainContainer>
  );
}
