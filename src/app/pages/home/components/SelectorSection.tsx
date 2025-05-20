import { GenresIcon } from "../../../../assets/icons/MyIcons";
import MovieSlider from "../../../../components/MovieSlider";

export default function SelectorSection() {
  return (
    <>
      <div className="bg-[#111111] w-full h-[120px] flex items-center">
        <div className="my_container flex items-center gap-5">
          <SelectorItem active />
          <SelectorItem />
          <SelectorItem />
          <SelectorItem />
        </div>
      </div>
      <div className="my_container my-5">
        <MovieSlider isLoading={false} list={[]} title="ჟანრები" />
      </div>
    </>
  );
}
function SelectorItem({ active }: { active?: boolean }) {
  return (
    <div
      className={`w-[300px] relative  ${
        !active ? "bg-bodyBg hover:bg-bodyBgDark" : "bg-bodyBgDark arrow_after"
      } h-[82px] flex justify-center items-center gap-3 cursor-pointer select-none`}
    >
      <div
        className={`h-7 aspect-square rounded-[10px] ${
          !active ? "" : "text-main "
        }`}
      >
        <GenresIcon />
      </div>
      <p>ჟანრები</p>
    </div>
  );
}
