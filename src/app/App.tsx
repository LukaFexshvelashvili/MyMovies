import { Route, Routes, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import Movies from "./pages/movies/Movies";
import TvShows from "./pages/movies/TvShows";
import Animations from "./pages/movies/Animations";
import Animes from "./pages/movies/Animes";
import Overlays from "./components/Overlays/Overlays";
import Search from "./pages/search/Search";

import UserDataControl from "../components/UserDataControl";
import Logout from "./pages/Logout";
import Watch from "./pages/movie/Watch";
import Footer from "../components/Footer";

function App() {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return <SuspenseLoader />;
  }
  return (
    <>
      <UserDataControl />
      <Navbar />
      <Overlays />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="logout" element={<Logout />} />
          <Route path="search/:search_query" element={<Search />} />
          <Route path="animations" element={<Animations />} />
          <Route path="animes" element={<Animes />} />
          <Route path="tv-shows" element={<TvShows />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:id/:title" element={<Watch />} />
          <Route path="tv-show/:id/:title" element={<Watch />} />
          <Route path="anime/:id/:title" element={<Watch />} />
          <Route path="animation/:id/:title" element={<Watch />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

export function SuspenseLoader() {
  return (
    <div className="flex justify-center items-center min-h-[400px] ">
      <div className="my_loader"></div>
    </div>
  );
}
