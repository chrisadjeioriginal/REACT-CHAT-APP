import "./friends.css";
import profile from "../assets/default_profile_pic.png";

export function FriendsHolder({ friendsList }) {
  return (
    <ul>
      {friendsList.map((friend, i) => (
        <li key={i} className="friend">
          <img src={profile} className="profile" />
          {friend.friend}
        </li>
      ))}
    </ul>
  );
}
