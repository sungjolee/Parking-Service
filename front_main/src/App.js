import './App.css';
import Home from "./components/Home/Home";
import Parking from "./components/Parking/Parking";
import SearchPage from "./components/Search/SearchPage";
import MenuBar from "./components/Static/MenuBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Datas from './components/Parking/Api';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/SearchPage" element={<SearchPage />} /> 
          <Route path="/Parking" element={<Parking />} />
          <Route path="/Api" element={<Datas />} />
        </Routes>
        <MenuBar />
      </div>
    </BrowserRouter>
  );
}

export default App;


