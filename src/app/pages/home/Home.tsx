import MovieCard from "../../../components/MovieCard";
import MainSlider from "./components/MainSlider";

export default function Home() {
  return (
    <main>
      <MainSlider />
      <div className="my_container my-10">
        <div className="flex gap-5">
          <MovieCard />
        </div>
        {/* <div className="my_loader"></div> */}
      </div>
    </main>
  );
}
