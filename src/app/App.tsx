import { Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import Home from "./pages/home/Home";
import { Suspense, useEffect, useState } from "react";
import Movie from "./pages/movie/Movie";
import Movies from "./pages/movies/Movies";

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
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movie/:id/:title" element={<Movie />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

function SuspenseLoader() {
  return (
    <div className="flex justify-center items-center min-h-[400px] ">
      <div className="my_loader"></div>
    </div>
  );
}
