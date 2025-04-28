import { Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import Home from "./pages/home/Home";
import { Suspense, useEffect, useState } from "react";
import Movie from "./pages/movie/Movie";
import Movies from "./pages/movies/Movies";
import TvShows from "./pages/movies/TvShows";
import Animations from "./pages/movies/Animations";
import Animes from "./pages/movies/Animes";
import Overlays from "./components/Overlays/Overlays";
import Alerts from "../components/Alerts";

function App() {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return <SuspenseLoader />;
  }
  return (
    <>
      <Navbar />
      <Overlays />
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="animations" element={<Animations />} />
            <Route path="animes" element={<Animes />} />
            <Route path="tv_shows" element={<TvShows />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movie/:id/:title" element={<Movie />} />
          </Route>
        </Routes>
      </Suspense>
      <Alerts />
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
