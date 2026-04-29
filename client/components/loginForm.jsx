export function LoginForm() {
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    padding: "20px",
  };
  return (
    <form
      style={{
        backgroundColor: "rgba(37, 98, 57, 0.79)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "90%",
        borderRadius: "20px",
      }}
    >
      <div style={style}>
        <label
          htmlFor="Username"
          style={{
            marginRight: "10px",
            fontFamily: "Arial",
          }}
        >
          USERNAME:{" "}
        </label>
        <input id="Username" />
      </div>

      <div style={style}>
        <label
          htmlFor="Password"
          style={{ marginRight: "10px", fontFamily: "Arial" }}
        >
          PASSWORD:{" "}
        </label>
        <input id="Password" />
      </div>

      <button
        style={{
          backgroundColor: "rgba(37, 98, 57, 0.79)",
          border: "2px dotted white",
          fontFamily: "Arial",
          cursor: "pointer",
          position: "relative",
          top: "60px",
        }}
      >
        {" "}
        LOGIN{" "}
      </button>
    </form>
  );
}
