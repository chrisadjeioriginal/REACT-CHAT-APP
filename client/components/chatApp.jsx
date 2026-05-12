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
import { LogoutButton } from "./logout_button.jsx";
import { LogoutMessageBox } from "./Logout-MessageBox.jsx";
import { LogoutMessageHolder } from "./LogoutMessageHolder.jsx";
import { LogoutMessageBoxButtonHolder } from "./LogoutMessageBoxButtonHolder.jsx";
import { LogoutMessageBoxButton } from "./LogoutMessageBoxButton.jsx";

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

  const [logoutButtonPressed, setLogoutButtonPressed] = useState(false);

  const MessageContainerRef = useRef(null);

  const clientRef = useRef(null);
  const friendsLookUpRef = useRef({});

  function closeLogoutButtonMessageBox() {
    setLogoutButtonPressed(false);
  }

  function Logout() {
    //Remember to remove cookies from browser before signing out
    // i.e. send a request to the backend server and have it set the maxAge of cookie to 0
    navigate("/");
  }

  useEffect(() => {
    setUsername(localStorage.getItem("Username"));
  }, []);

  useEffect(() => {
    if (!username) {
      return;
    }
    const client = io("https://playmaker-sushi-divinely.ngrok-free.dev", {
      withCredentials: true,
      transports: ["websocket"],
    });

    clientRef.current = client;

    client.on("connect", () => {
      console.log("I have connected from react front end");

      client.emit("join-room", { username: username });
    });

    const handler = async (msg) => {
      setMessageStore((prev) => [...prev, msg]);

      if (!friendsLookUpRef.current[msg.sender] && msg.sender !== username) {
        try {
          console.log("ABOUT TO SEND REQUEST");
          const response = await axios.post(
            "https://playmaker-sushi-divinely.ngrok-free.dev/api/Users",

            {
              friendName: msg.sender,
              convoId: msg.convoId,
              myName: username,
            },
            {
              withCredentials: true,
            },
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
    };

    client.on("message", handler);

    // AddToFriendsList();

    return () => {
      client.disconnect();
      client.off("message", handler);
    };
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
      const response = await axios.post(
        "https://playmaker-sushi-divinely.ngrok-free.dev/api/Friends",

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

          return updatedLookup;
        });
      }
    }

    getFriends();
  }, [username]);

  useEffect(() => {
    if (!username) return;
    async function getMessages() {
      try {
        const response = await axios.post(
          "https://playmaker-sushi-divinely.ngrok-free.dev/api/Messages",
          { myName: username },
          {
            withCredentials: true,
          },
        );

        if (response.data.allMessages) {
          setMessageStore(response.data.allMessages);
        }
      } catch (err) {
        console.log("ERROR WHILE RETRIEVING MESSAGES");
      }
    }
    getMessages();
  }, [username]);

  useEffect(() => {
    friendsLookUpRef.current = friendsLookup;
  }, []);

  useEffect(() => {
    if (friendsList.length > 0 && !convoId) {
      setConvoId(friendsList[0].convoId);
    }
  }, [friendsList]);

  useEffect(() => {
    if (!MessageContainerRef) return;
    const DistanceToBottom =
      MessageContainerRef.current.scrollHeight -
      MessageContainerRef.current.scrollTop -
      MessageContainerRef.current.clientHeight;

    if (DistanceToBottom < 500) {
      MessageContainerRef.current.scrollTop =
        MessageContainerRef.current.scrollHeight;
    }

    if (MessageContainerRef.current.scrollTop < 100) {
      MessageContainerRef.current.scrollTop =
        MessageContainerRef.current.scrollHeight;
    }
  }, [messageStore]);

  return (
    <MainContainer>
      {logoutButtonPressed && (
        <LogoutMessageBox>
          <LogoutMessageHolder />
          <LogoutMessageBoxButtonHolder>
            <LogoutMessageBoxButton
              message="No"
              colour="rgb(96, 119, 236)"
              task={closeLogoutButtonMessageBox}
            />
            <LogoutMessageBoxButton
              message="Yes"
              colour="rgb(187, 239, 81)"
              task={Logout}
            />
          </LogoutMessageBoxButtonHolder>
        </LogoutMessageBox>
      )}
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
        <LogoutButton setLogoutButtonPressed={setLogoutButtonPressed} />
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
            MessageContainerRef={MessageContainerRef}
          />
        </ChatList>
        <ChatWindow>
          <MessageContainer MessageContainerRef={MessageContainerRef}>
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
