import { Route, Routes, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Home from "./pages/home/Home";
import { lazy, Suspense, useEffect, useState } from "react";
// import Movies from "./pages/movies/Movies";
import Overlays from "./components/Overlays/Overlays";
// import Search from "./pages/search/Search";

import UserDataControl from "../components/UserDataControl";
// import Logout from "./pages/Logout";
// import Watch from "./pages/movie/Watch";
import Footer from "../components/Footer";
// const Home = lazy(() => import("./pages/home/Home"));
const Movies = lazy(() => import("./pages/movies/Movies"));
const Search = lazy(() => import("./pages/search/Search"));
const Logout = lazy(() => import("./pages/Logout"));
const Watch = lazy(() => import("./pages/movie/Watch"));
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
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="logout" element={<Logout />} />
            <Route path="search/" element={<Search />} />
            <Route path="search/:search_query" element={<Search />} />
            <Route path="movies" element={<Movies type={0} />} />
            <Route path="tv-shows" element={<Movies type={1} />} />
            <Route path="animations" element={<Movies type={2} />} />
            <Route path="animes" element={<Movies type={3} />} />
            <Route path="movie/:id/:title" element={<Watch />} />
            <Route path="tv-show/:id/:title" element={<Watch />} />
            <Route path="anime/:id/:title" element={<Watch />} />
            <Route path="animation/:id/:title" element={<Watch />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;

export function SuspenseLoader() {
  return (
    <div className="flex justify-center items-center min-h-[400px] w-full h-full ">
      <div className="my_loader"></div>
    </div>
  );
}
