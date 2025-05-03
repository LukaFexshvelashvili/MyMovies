import { useEffect, useState } from "react";
import {
  CheckedIcon,
  CloseIcon,
  DropDownIcon,
  FiltersIcon,
} from "../assets/icons/MyIcons";
import { addons, genres, imdbs, languages, years } from "../api/themes";
import { useSearchParams } from "react-router";

type TFiltersList = {
  genres: { title: string; filter: any[] };
  languages: { title: string; filter: any[] };
  years: { title: string; filter: any[] };
  imdbs: { title: string; filter: any[] };
  addons: { title: string; filter: any[] };
};
type TFilterNames = "genres" | "languages" | "years" | "imdbs" | "addons";

export default function Filters() {
  const [_, setSearchParams] = useSearchParams();

  const initialFilters = {
    genres: { title: "ჟანრები", filter: [] },
    languages: { title: "ენა", filter: [] },
    years: { title: "წელი", filter: [] },
    imdbs: { title: "შეფასება (IMDb)", filter: [] },
    addons: { title: "დამატებები", filter: [] },
  };

  const [filtersList, setFiltersList] = useState<TFiltersList>(initialFilters);
  const removeFilter = (filter_name: TFilterNames) => {
    const updatedFilters = { ...filtersList };
    updatedFilters[filter_name].filter = [];
    setFiltersList(updatedFilters);
  };
  useEffect(() => {
    const params: any = {};

    if (filtersList.genres.filter.length)
      params.genres = JSON.stringify(filtersList.genres.filter);
    if (filtersList.languages.filter.length)
      params.languages = JSON.stringify(filtersList.languages.filter);
    if (filtersList.years.filter.length)
      params.years = JSON.stringify(filtersList.years.filter);
    if (filtersList.imdbs.filter.length)
      params.imdbs = JSON.stringify(filtersList.imdbs.filter);
    if (filtersList.addons.filter.length)
      params.addons = JSON.stringify(filtersList.addons.filter);

    setSearchParams(params);
  }, [filtersList]);

  return (
    <div className="flex flex-col">
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
              <FilterBlock
                list={genres}
                name="genres"
                setFilter={setFiltersList}
                filtered={filtersList.genres.filter}
              />
            </div>
            <div className="group relative px-8 border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              გახმოვანება
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock
                list={languages}
                name="languages"
                setFilter={setFiltersList}
                filtered={filtersList.languages.filter}
              />
            </div>
            <div className="group relative px-8 border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              წელი
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock
                list={years}
                name="years"
                setFilter={setFiltersList}
                filtered={filtersList.years.filter}
              />
            </div>
            <div className="group relative px-8 last:border-r border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              IMDb რეიტინგი
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock
                list={imdbs}
                name="imdbs"
                setFilter={setFiltersList}
                filtered={filtersList.imdbs.filter}
              />
            </div>
            <div className="group relative px-8 last:border-r border-l gap-3 text-textHead2 border-white/10 h-full flex items-center cursor-pointer hover:bg-bodyBg transition-colors">
              დამატებები
              <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
              <FilterBlock
                list={addons}
                name="addons"
                setFilter={setFiltersList}
                filtered={filtersList.addons.filter}
              />
            </div>
          </div>
          <div
            className="flex items-center gap-3 text-textDesc hover:text-main cursor-pointer ml-auto"
            onClick={() => setFiltersList(initialFilters)}
          >
            გასუფთავება
          </div>
        </div>
      </div>
      <div className="my_container flex gap-3 my-3">
        {Object.keys(filtersList).map(
          (filter_name, i) =>
            filtersList[filter_name as TFilterNames].filter.length != 0 && (
              <div
                key={filter_name + i}
                className="text-textHead2 pl-5 pr-3 py-1 text-sm bg-white/5 flex gap-2 items-center "
              >
                {filtersList[filter_name as TFilterNames].title}{" "}
                <CloseIcon
                  onClick={() => removeFilter(filter_name as TFilterNames)}
                  className="h-4 text-textDesc cursor-pointer"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

function FilterBlock({
  list,
  name,
  setFilter,
  filtered,
}: {
  list: any[];
  name: string;
  setFilter: (new_filters: any) => void;
  filtered: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = list.filter((item) =>
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
              setFilter((prev: any) => {
                const currentFilter = prev[name]?.filter || [];
                const isActive = currentFilter.includes(item.title);
                return {
                  ...prev,
                  [name]: {
                    ...prev[name],
                    filter: isActive
                      ? currentFilter.filter((k: string) => k !== item.title)
                      : [...currentFilter, item.title],
                  },
                };
              });
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-5 aspect-square border-2 border-white/10 flex items-center justify-center ${
                  filtered.includes(item.title)
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
