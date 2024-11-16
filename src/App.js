import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from './context/global';  
import AnimeItem from "./components/Animeitem";
import Gallery from "./components/Gallery";
import Homepage from "./components/Homepage";
import About from "./components/About";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          <Route path="/character/:id" element={<Gallery />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;