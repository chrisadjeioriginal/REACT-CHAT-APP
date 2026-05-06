import axios from "axios";

export function SearchBoxSearchButton({
  searchBoxText,
  setSearchBoxText,
  setFriendsList,
}) {
  async function search() {
    try {
      console.log(`this is the input ${searchBoxText}`);
      const res = await axios.post(
        "http://localhost:3000/Users",
        { username: searchBoxText },
        { withCredentials: true },
      );

      if (res.data.success) {
        console.log(res.data.message);
        setFriendsList((prev) => [...prev, res.data.username]);
        setSearchBoxText("");
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
