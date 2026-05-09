import "./friends.css";
import profile from "../assets/default_profile_pic.png";

export function FriendsHolder({
  friendsList,
  setRecipient,
  setConvoId,
  messageStore, // this holds messages of between you and all your friends
  // message store acts like a cache to prevent constant api calls to the backend
}) {
  function displayChatMessages(friend) {
    // console.log(e.target.textContent);
    // setRecipient(e.target.textContent);
    // setConvoId(e.target.id);
    setRecipient(friend.friend);
    setConvoId(friend.convoId);
  }

  return (
    <ul>
      {friendsList.map((friend) => (
        <li
          key={friend.convoId}
          className="friend"
          id={friend.convoId}
          onClick={() => displayChatMessages(friend)}
        >
          <img
            // onClick={displayChatMessages(friend)}
            id={friend.convoId}
            src={profile}
            className="profile"
            style={{ border: "5px solid rgb(64, 255, 0)", borderRadius: "50%" }}
          />
          {friend.friend}
        </li>
      ))}
    </ul>
  );
}
