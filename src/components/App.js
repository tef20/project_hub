import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import DisplayArea from "./DisplayArea";

function App() {
  return (
    <div className="Dashboard">
      <Header />
      <Navbar />
      <DisplayArea />
      <Footer />
    </div>
  );
}

export default App;
