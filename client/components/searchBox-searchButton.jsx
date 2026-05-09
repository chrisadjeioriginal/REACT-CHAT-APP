import axios from "axios";

export function SearchBoxSearchButton({
  searchBoxText,
  setSearchBoxText,
  setFriendsList,
  setRecipient,
  setConvoId,
  username,
}) {
  async function search() {
    try {
      console.log(`this is the input ${searchBoxText}`);
      // const res = await axios.post(
      //   "http://localhost:3000/Users",
      //   { friendName: searchBoxText, myName: username },
      //   { withCredentials: true },
      // );

      const res = await axios.post(
        "/api/Users",
        { friendName: searchBoxText, myName: username },
        { withCredentials: true },
      );

      if (res.data.success) {
        console.log(res.data);
        console.log(res.data.message);

        setFriendsList((prev) => [
          ...prev,
          { convoId: res.data.convoId, friend: res.data.friendName },
        ]);

        setSearchBoxText("");
        setRecipient(res.data.friendName);
        setConvoId(res.data.convoId);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("SEARCH FAILED!");
    }
  }

  const style = {
    width: "20%",
    background:
      "linear-gradient(to right ,rgb(145, 255, 108), rgb(40, 202, 40))",
    position: "relative",
    borderRadius: "10px",
    border: "2px inset white",
    cursor: "pointer",
  };
  return (
    <button style={style} onClick={search}>
      ➤
    </button>
  );
}
