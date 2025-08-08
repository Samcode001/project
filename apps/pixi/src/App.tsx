// import './App.css'

import { useEffect } from "react";
import Experience from "./components/Experience";
import socket from "./helper/socket";

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    socket.on("connection", () => {
      console.log(" A new user connected");
    });
  }, []);

  return (
    <>
      <Experience />
    </>
  );
}

export default App;
