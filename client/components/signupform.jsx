import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  async function gatherFormData(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());
    console.log(values);

    // const response = await axios.post("http://localhost:3000/Register", values);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Register`,
      values,
    );

    if (response.data.success) {
      console.log(response.data.message);
      navigate("/");
    } else {
      console.log(response.data.message);
    }
  }

  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    padding: "20px",
  };

  return (
    <form
      onSubmit={gatherFormData}
      style={{
        // backgroundColor: "rgba(37, 98, 57, 0.79)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "90%",
        borderRadius: "20px",
        color: "white",
      }}
    >
      <div style={style}>
        <label
          htmlFor="username"
          style={{
            marginRight: "10px",
          }}
        >
          USERNAME:
        </label>
        <input name="username" id="username" />
      </div>

      <div style={style}>
        <label htmlFor="password" style={{ marginRight: "10px" }}>
          PASSWORD:
        </label>
        <input name="password" id="password" />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "rgba(62, 203, 106, 0.81)",

          //   fontFamily: "Arial",
          cursor: "pointer",
          position: "relative",
          top: "60px",
          border: "1px solid black",
          borderRadius: "10px",
          boxShadow: "5px 5px 5px rgba(0, 213, 255, 0.44)",
        }}
      >
        sign up{" "}
      </button>
    </form>
  );
}
