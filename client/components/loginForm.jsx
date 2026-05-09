import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  async function gatherFormData(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());

    // const response = await axios.post(
    //   "http://localhost:3000/api/Login",
    //   values,
    //   {
    //     withCredentials: true,
    //   },
    // );

    const response = await axios.post(
      "https://playmaker-sushi-divinely.ngrok-free.dev/api/Login",
      values,
      {
        withCredentials: true,
      },
    );

    // const response = await axios.post(`/api/Login`, values, {
    //   withCredentials: true,
    // });
    if (response.data.success) {
      localStorage.setItem("Username", response.data.userId);
      navigate("/ChatApp");
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
          htmlFor="username"
          style={{
            marginRight: "10px",
            // fontFamily: "Arial",
          }}
        >
          USERNAME:{" "}
        </label>
        <input name="username" id="username" />
      </div>

      <div style={style}>
        <label htmlFor="password" style={{ marginRight: "10px" }}>
          PASSWORD:{" "}
        </label>
        <input name="password" id="password" />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "rgba(93, 135, 141, 0.79)",
          border: "2px dotted white",

          cursor: "pointer",
          position: "relative",
          top: "60px",
          border: "1px solid black",
          borderRadius: "10px",
          boxShadow: "5px 5px 5px rgba(0, 213, 255, 0.44)",
        }}
      >
        {" "}
        login{" "}
      </button>
    </form>
  );
}
