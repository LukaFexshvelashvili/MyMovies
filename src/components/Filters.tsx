import { DropDownIcon, FiltersIcon } from "../assets/icons/MyIcons";

export default function Filters() {
  return (
    <div className="bg-[#292929] w-full h-[60px] flex items-center">
      <div className="my_container flex h-full">
        <div className="flex items-center gap-3 text-textDesc">
          <FiltersIcon className="h-[18px] aspect-square" />
          ფილტრი
        </div>
        <div className="flex ml-10">
          <div className="px-8 border-l gap-3 text-textHead border-white/10 h-full flex items-center cursor-pointer hover:bg-white/5 transition-colors">
            ჟანრი
            <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
          </div>
          <div className="px-8 border-l gap-3 text-textHead border-white/10 h-full flex items-center cursor-pointer hover:bg-white/5 transition-colors">
            გახმოვანება
            <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
          </div>
          <div className="px-8 border-l gap-3 text-textHead border-white/10 h-full flex items-center cursor-pointer hover:bg-white/5 transition-colors">
            წელი
            <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
          </div>
          <div className="px-8 last:border-r border-l gap-3 text-textHead border-white/10 h-full flex items-center cursor-pointer hover:bg-white/5 transition-colors">
            IMDb რეიტინგი
            <DropDownIcon className="h-[12px] aspect-square [&>path]:fill-textDesc" />
          </div>
        </div>
      </div>
    </div>
  );
}
