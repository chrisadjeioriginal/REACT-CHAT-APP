import { ChatApp } from "./chatApp.jsx";
import { LogIn } from "./logIn.jsx";
import { SignUp } from "./signup.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

export function App() {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn setUsername={setUsername} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ChatApp" element={<ChatApp username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}
