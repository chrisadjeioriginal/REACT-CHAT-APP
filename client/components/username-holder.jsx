export function UsernameHolder({ username }) {
  const style = {
    fontFamily: "cursive",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "50px",
  };
  return <h1 style={style}>Welcome {username}</h1>;
}
