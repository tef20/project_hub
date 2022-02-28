import Navbar from "./Navbar";
import Header from "./Header";
import ViewWindow from "./ViewWindow";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubAthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    console.log("Updating user");
    return unsubAthState;
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <Header user={user} />
        <Navbar user={user} />
        <ViewWindow user={user} />
        <Footer user={user} />
      </BrowserRouter>
    </div>
  );
}

export default App;
