import "./styles.css";
import Nav from "./Component/nav/Nav";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatBody from "./Component/chatBody/ChatBody";
import Chat from "./Chat";
import Register from "./Register";
import Start from "./Start";

export default function App() {
  return (
    <div className="__main">
     
      <Router />
    </div>
  );
}
const Router = () => {
  return (

 <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/chat" element={<Chat />}/>
          <Route path="/main" element={<Main />}/>
          <Route path="/register" element={<Register />}/>
        
        </Routes>
    </BrowserRouter>

  );
};
