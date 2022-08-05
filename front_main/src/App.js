import './App.css';
import Home from "./components/Home/Home";
import SearchPage from "./components/Search/SearchPage";
import MenuBar from "./components/Static/MenuBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import API from './components/Maps/Chicken/API';
import CentralPark from './components/Maps/CentralPark/API';
import GreenLoad from './components/Maps/GreenLoad/API';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/SearchPage" element={<SearchPage />} /> 
          <Route path="/parking" element={<API />} />
          <Route path="/parking/centralpark" element={<CentralPark />} />
          <Route path="/parking/greenload" element={<GreenLoad />} />
        </Routes>
        <MenuBar />
      </div>
    </BrowserRouter>
  );
}

export default App;


