import { useState } from "react";
import {
  CheckedIcon,
  DropDownIcon,
  FiltersIcon,
} from "../assets/icons/MyIcons";
import { addons, genres, imdbs, languages, years } from "../api/themes";

// type TFiltersList = {
//   [key: string]: string;
// };

export default function Filters() {
  // const [filtersList, setFiltersList] = useState({});
  return (
    <div className="">
      <div className="bg-[#292929] w-full h-[70px] flex items-center">
        <div className="my_container flex h-full items-center ">
          <div className="flex items-center gap-3 text-textDesc ">
            <FiltersIcon className="h-[18px] aspect-square" />
            ფილტრი
          </div>
          <div className="flex ml-10 h-full ">
            <div className="group relative px-8 border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              ჟანრი
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc " />
              <FilterBlock list={genres} />
            </div>
            <div className="group relative px-8 border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              გახმოვანება
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock list={languages} />
            </div>
            <div className="group relative px-8 border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              წელი
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock list={years} />
            </div>
            <div className="group relative px-8 last:border-r border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              IMDb რეიტინგი
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock list={imdbs} />
            </div>
            <div className="group relative px-8 last:border-r border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              დამატებები
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock list={addons} />
            </div>
          </div>
          <div className="flex items-center gap-3 text-textDesc hover:text-main cursor-pointer ml-auto">
            გასუფთავება
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBlock(props: { list: any[] }) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = props.list.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invisible group-hover:visible absolute z-10 left-0 w-[250px] h-auto max-h-[300px] pb-2 bg-bodyBg shadow-lg top-[70px] cursor-default flex flex-col">
      <div className="flex items-center p-3">
        <input
          className="w-full h-[36px] border-2 border-white/10 text-textHead text-sm"
          placeholder="ძიება"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-1 w-full overflow-auto flex flex-col select-none">
        {filteredList.map((item, i) => (
          <div
            className="flex items-center gap-3 cursor-pointer bg-white/0 hover:bg-white/5 px-3 py-2"
            key={i}
            onClick={() => {
              if (activeFilters.includes(item.title)) {
                setActiveFilters((prev) =>
                  prev.filter((filter) => filter !== item.title)
                );
              } else {
                setActiveFilters((prev) => [...prev, item.title]);
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-5 aspect-square border-2 border-white/10 flex items-center justify-center ${
                  activeFilters.includes(item.title)
                    ? "bg-main border-0 [&>svg]:block"
                    : "[&>svg]:hidden"
                }`}
              >
                <CheckedIcon className="h-3 aspect-square" />
              </div>
              <p className="text-textDesc text-[15px] tracking-wide">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
