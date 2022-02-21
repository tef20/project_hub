import Navbar from "./Navbar";
import Header from "./Header";
import ViewWindow from "./ViewWindow";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <ViewWindow />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
