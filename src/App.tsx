import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/portfolio";
import Admin from "./pages/Admin";
import UGMovies from "./pages/ugmovies";
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ugmovies" element={<UGMovies />} />
      </Routes>
    </BrowserRouter>
  );
}
