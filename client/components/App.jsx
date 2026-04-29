import { ChatApp } from "./chatApp.jsx";
import { LogIn } from "./logIn.jsx";
import { SignUp } from "./signup.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ChatApp" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}
