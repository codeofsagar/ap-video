import { Routes, Route, useLocation } from "react-router-dom";


// 1. Import the Provider
// Make sure the path matches where you saved the file from Step 1
import { BackgroundProvider } from "./components/Menu/BackgroundContext"; 

import Menu from "./components/Menu/Menu";
import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import ScrollToTop  from "./components/ScrollToTop";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      {/* 2. Wrap EVERYTHING in the BackgroundProvider */}
      <BackgroundProvider>
        
        <ScrollToTop />
        <Menu />
        
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/portfolio" element={<Work />} />
          </Routes>
        </AnimatePresence>

      </BackgroundProvider>
    </>
  );
}

export default App;