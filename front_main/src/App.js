import './App.css';
import Home from "./components/Home";
import Parking from "./components/Parking";
import Search from "./components/Search";
import MenuBar from "./components/MenuBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Search" element={<Search />} /> 
          <Route path="/Parking" element={<Parking />} />
        </Routes>
        <MenuBar />
      </div>
    </BrowserRouter>
  );
}

export default App;


