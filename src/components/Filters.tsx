import { useState } from "react";
import {
  CheckedIcon,
  CloseIcon,
  DropDownIcon,
  FiltersIcon,
} from "../assets/icons/MyIcons";
import { types, addons, genres, imdbs, languages, years } from "../api/themes";
import { useSearchParams } from "react-router";
import { useEffectSkipFirst } from "../app/hooks/useEffectSkipFirst";

type TFiltersList = {
  types: { title: string; filter: any[] };
  genres: { title: string; filter: any[] };
  languages: { title: string; filter: any[] };
  years: { title: string; filter: any[] };
  imdbs: { title: string; filter: any[] };
  addons: { title: string; filter: any[] };
};
type TFilterNames =
  | "types"
  | "genres"
  | "languages"
  | "years"
  | "imdbs"
  | "addons";

export default function Filters(props: {
  type_off?: boolean;
  initialFilters?: any;
  setFilters: Function;
}) {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const initialFilters = {
    types: {
      title: "ტიპი",
      filter: props.initialFilters?.types
        ? JSON.parse(props.initialFilters.types)
        : [],
    },
    genres: {
      title: "ჟანრები",
      filter: props.initialFilters?.genres
        ? JSON.parse(props.initialFilters.genres)
        : [],
    },
    languages: {
      title: "ენა",
      filter: props.initialFilters?.languages
        ? JSON.parse(props.initialFilters.languages)
        : [],
    },
    years: {
      title: "წელი",
      filter: props.initialFilters?.years
        ? JSON.parse(props.initialFilters.years)
        : [],
    },
    imdbs: {
      title: "შეფასება (IMDb)",
      filter: props.initialFilters?.imdbs
        ? JSON.parse(props.initialFilters.imdbs)
        : [],
    },
    addons: {
      title: "დამატებები",
      filter: props.initialFilters?.addons
        ? JSON.parse(props.initialFilters.addons)
        : [],
    },
  };
  const [_, setSearchParams] = useSearchParams();
  const [filtersList, setFiltersList] = useState<TFiltersList>(initialFilters);
  const removeFilter = (filter_name: TFilterNames) => {
    const updatedFilters = { ...filtersList };
    updatedFilters[filter_name].filter = [];
    setFiltersList(updatedFilters);
  };
  useEffectSkipFirst(() => {
    const params: any = {};
    if (filtersList.types.filter.length)
      params.types = JSON.stringify(filtersList.types.filter);
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

    props.setFilters(params);
  }, [filtersList]);

  return (
    <>
      <div className="my_container block filterChange:hidden mt-5">
        <button
          className="  border border-white/5 text-textDescLight h-[36px] gap-2 flex items-center px-4 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setShowFilters(true)}
        >
          ფილტრები
        </button>
      </div>
      <div
        className={` ${
          showFilters
            ? "visible opacity-100"
            : "invisible opacity-0 filterChange:visible filterChange:opacity-100"
        } flex flex-col filterChange:relative mobile:z-10 z-50 fixed top-0 left-0 h-[100dvh] w-full filterChange:h-auto filterChange:bg-transparent bg-black/90`}
      >
        <div className="filterChange:bg-[#292929] w-full filterChange:h-[60px] h-full ">
          <div className="my_container flex h-full items-center flex-col filterChange:flex-row gap-5 justify-center">
            <div className="filterChange:flex items-center gap-3 text-textDesc hidden ">
              <FiltersIcon className="h-[18px] aspect-square" />
              ფილტრი
            </div>
            <div
              onClick={() => setShowFilters(false)}
              className="filterChange:hidden flex justify-center items-center text-textHead2 absolute top-3 right-3 h-8 aspect-square"
            >
              <CloseIcon />
            </div>
            <div className="gap-2 my-1 flex items-start justify-start w-full filterChange:hidden h-[40px] max-w-full overflow-x-auto no_scrollbar">
              {Object.keys(filtersList).map(
                (filter_name, i) =>
                  filtersList[filter_name as TFilterNames].filter.length !=
                    0 && (
                    <div
                      key={filter_name + i}
                      className="text-textHead2 pl-5 pr-3 py-1.5 text-sm bg-navBg flex gap-2 items-center shrink-0"
                    >
                      {filtersList[filter_name as TFilterNames].title}{" "}
                      <CloseIcon
                        onClick={() =>
                          removeFilter(filter_name as TFilterNames)
                        }
                        className="h-4 text-textDesc cursor-pointer"
                      />
                    </div>
                  )
              )}
            </div>
            <div className="flex filterChange:ml-5 filterChange:h-full w-full filterChange:flex-row flex-col filterChange:gap-0 gap-5 justify-center filterChange:justify-start">
              {!props.type_off && (
                <FilterBlock
                  name_geo="ფილმი"
                  list={types}
                  name="types"
                  setFilter={setFiltersList}
                  filtered={filtersList.types.filter}
                  on_id
                />
              )}
              <FilterBlock
                name_geo="ჟანრი"
                list={genres}
                name="genres"
                setFilter={setFiltersList}
                filtered={filtersList.genres.filter}
              />
              <FilterBlock
                name_geo="გახმოვანება"
                list={languages}
                name="languages"
                setFilter={setFiltersList}
                filtered={filtersList.languages.filter}
              />
              <FilterBlock
                name_geo="წელი"
                list={years}
                name="years"
                setFilter={setFiltersList}
                filtered={filtersList.years.filter}
              />
              <FilterBlock
                name_geo="IMDb რეიტინგი"
                list={imdbs}
                name="imdbs"
                setFilter={setFiltersList}
                filtered={filtersList.imdbs.filter}
              />
              <FilterBlock
                name_geo="დამატებები"
                list={addons}
                name="addons"
                setFilter={setFiltersList}
                filtered={filtersList.addons.filter}
              />
            </div>

            <div
              className="flex items-center gap-3 text-textDesc hover:text-main cursor-pointer ml-auto"
              onClick={() => {
                setFiltersList({
                  types: {
                    title: "ტიპი",
                    filter: [],
                  },
                  genres: {
                    title: "ჟანრები",
                    filter: [],
                  },
                  languages: {
                    title: "ენა",
                    filter: [],
                  },
                  years: {
                    title: "წელი",
                    filter: [],
                  },
                  imdbs: {
                    title: "შეფასება (IMDb)",
                    filter: [],
                  },
                  addons: {
                    title: "დამატებები",
                    filter: [],
                  },
                });
                setSearchParams({});
              }}
            >
              გასუფთავება
            </div>
          </div>
        </div>
        <div className="my_container gap-3 my-3 hidden filterChange:flex">
          {Object.keys(filtersList).map(
            (filter_name, i) =>
              filtersList[filter_name as TFilterNames].filter.length != 0 && (
                <div
                  key={filter_name + i}
                  className="text-textHead2 pl-5 pr-2.5 py-1.5 text-sm bg-white/5 flex gap-3 items-center "
                >
                  {filtersList[filter_name as TFilterNames].title}{" "}
                  <CloseIcon
                    onClick={() => removeFilter(filter_name as TFilterNames)}
                    className="h-3 text-textDesc cursor-pointer"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

function FilterBlock({
  list,
  name,
  name_geo,
  setFilter,
  filtered,
  on_id,
}: {
  list: any[];
  name: string;
  name_geo: string;
  setFilter: (new_filters: any) => void;
  filtered: any[];
  on_id?: boolean;
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="group filterChange:relative px-6 filterChange:border-0 filterChange:border-l border-2 gap-3 text-textHead2 border-white/10 filterChange:h-full h-[45px] filterChange:w-auto  w-full justify-between filterChange:justify-start flex items-center cursor-pointer hover:bg-bodyBg transition-colors"
      onClick={() => {
        if (window.innerWidth < 1200) {
          setShowDropdown(true);
        }
      }}
    >
      {name_geo}
      <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc " />
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setShowDropdown(false);
        }}
        className={`${
          showDropdown ? "visible" : "invisible"
        } filterChange:hidden h-full w-full top-0 left-0 absolute bg-black/20 z-10`}
      ></div>
      <div
        className={` transition-[opacity,visibility] ${
          showDropdown
            ? "visible opacity-100"
            : "opacity-0 invisible filterChange:group-hover:visible filterChange:group-hover:opacity-100"
        } absolute z-20 filterChange:left-0 left-2/4 filterChange:-translate-x-0 -translate-x-2/4 filterChange:-translate-y-0 -translate-y-2/4  top-2/4 filterChange:w-[250px] w-[calc(100%-30px)] h-auto filterChange:max-h-[300px] max-h-[400px] pb-2 bg-bodyBg shadow-lg filterChange:top-[70px] cursor-default flex flex-col `}
      >
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
                  const isActive = currentFilter.includes(
                    !on_id ? item.title : item.id
                  );
                  return {
                    ...prev,
                    [name]: {
                      ...prev[name],
                      filter: isActive
                        ? currentFilter.filter(
                            (k: string) => k !== (!on_id ? item.title : item.id)
                          )
                        : [...currentFilter, !on_id ? item.title : item.id],
                    },
                  };
                });
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-5 aspect-square border-2 border-white/10 flex items-center justify-center ${
                    filtered.includes(!on_id ? item.title : item.id)
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
    </div>
  );
}
