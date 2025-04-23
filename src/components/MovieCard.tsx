import { Link } from "react-router";
import {
  BookmarkIcon,
  HeartIcon,
  IMDbIcon,
  TrailerIcon,
} from "../assets/icons/MyIcons";

type TMovieCard = {
  small?: boolean;
};
export default function MovieCard({ small }: TMovieCard) {
  return (
    <div
      className={` ${
        small ? "w-[290px]" : "w-[365px]"
      } group/card duration-200 cursor-pointer transition-colors shrink-0`}
    >
      <div className="relative w-full aspect-video bg-[#3b3b3b]">
        <div className="top-0 right-0 color-white absolute text-[13px] flex group-hover/card:opacity-0  pointer-events-none">
          <span className="bg-[#2c2c2cbb] px-1.5 py-0.5 flex justify-center items-center">
            ინგ
          </span>
          <span className="bg-main px-1.5 py-0.5 flex justify-center items-center">
            ქარ
          </span>
        </div>
        <div className="h-full w-full absolute top-0 left-0  pointer-events-none group-hover/card:pointer-events-auto opacity-0 group-hover/card:opacity-100 z-90">
          <Link
            to={"/movie/0001/Lilo-&-Stitch"}
            className="h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] absolute"
          ></Link>
          <div
            className="absolute top-1.5 right-1.5 my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
            aria-title="თრეილერი"
          >
            <TrailerIcon className="h-5 aspect-square" />
          </div>
        </div>
        <img
          src="https://cdn.moviesgo.ge/uploads/823/tQyTM1H_sm2.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-2">
          <div className="flex items-center gap-2 font-mainSemiBold text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            7.1
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between px-2.5 pr-1 pt-2.5  pb-2.5 group-hover/card:bg-[#ffffff]/10">
        <div className="flex flex-col gap-0.5 case_up uppercase tracking-wide">
          <p className="text-textHead font-robotoGeoCaps text-[16px]">
            ლილო და სტიჩი
          </p>
          <p className="text-textDesc text-[14px]">Lilo & Stitch (2025)</p>
        </div>
        <div className="h-[32px] aspect-square flex justify-center items-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.1)] cursor-pointer">
          <div className="flex flex-col gap-[3px] cursor-pointer">
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MovieCardWide() {
  const HeartMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const BookmarkMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Link
      to={"/movie/0001/Lilo-&-Stitch"}
      className={` w-full group/card duration-200 cursor-pointer transition-colors shrink-0 flex gap-3 px-4 py-5  bg-white/0 hover:bg-white/5`}
    >
      <div className="relative w-[300px] min-h-[170px] shrink-0 aspect-video bg-[#3b3b3b]">
        <div className="top-0 right-0 color-white absolute text-[13px] flex group-hover/card:opacity-0  pointer-events-none">
          <span className="bg-[#2c2c2cbb] px-1.5 py-0.5 flex justify-center items-center">
            ინგ
          </span>
          <span className="bg-main px-1.5 py-0.5 flex justify-center items-center">
            ქარ
          </span>
        </div>
        <div className="h-full w-full absolute top-0 left-0  pointer-events-none group-hover/card:pointer-events-auto opacity-0 group-hover/card:opacity-100 z-90">
          <Link
            to={"/movie/0001/Lilo-&-Stitch"}
            className="h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] absolute"
          ></Link>
          <div
            className="absolute top-1.5 right-1.5 my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
            aria-title="თრეილერი"
          >
            <TrailerIcon className="h-5 aspect-square" />
          </div>
        </div>
        <img
          src="https://cdn.moviesgo.ge/uploads/823/tQyTM1H_sm2.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-2">
          <div className="flex items-center gap-2 font-mainSemiBold text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            7.1
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-0.5 case_up uppercase tracking-wide">
          <div className="flex justify-between">
            <p className="text-textHead font-robotoGeoCaps text-[16px]">
              ლილო და სტიჩი
            </p>
            <div className="flex gap-2 text-white/40 mt-1 text-[14px]">
              <div className="language">ქართულად</div>
              <div className="language">ინგლისურად</div>
              <div className="language">რუსულად</div>
            </div>
          </div>

          <p className="text-textDesc text-[14px]">Lilo & Stitch (2025)</p>
        </div>
        <p className="text-textDescLight text-[15px] mt-0.5 max-h-[100px] truncate whitespace-normal line-clamp-3">
          2018 წლის ანიმაციური ფილმის “ადამიანი-ობობა: სამყაროს მიღმა“ სიქველი,
          ნიუ-იორკში მცხოვრები შავკანიანი მოზარდის მაილზ მორალესის შესახებ,
          რომელიც შემთხვევით მუტირებული ობობას მიერ დაკბენის შემდეგ
          ზეშესაძლებლობებს შეიძენს და კრიმინალის წინააღმდეგ მებრძოლი სუპერ გმირი
          – ადამიანი-ობობა გახდება. ახლა ბრუკლინელი მაილზ მორალესი ახალგაზრდა
          ქალ-ობობასთან, გვენ სტეისთან და ადამიანი-ობობების ახალ გუნდთან ერთად
          ეპიკური თავგადასავალებით სავსე მოგზაურობაში მიდის მულტისამყაროში,
          სადაც ყველაზე ძლიერ ბოროტმოქმედთან დაპირისპირება მოუწევთ. –
          ადამიანი-ობობა გახდება. ახლა ბრუკლინელი მაილზ მორალესი ახალგაზრდა
          ქალ-ობობასთან, გვენ სტეისთან და ადამიანი-ობობების ახალ გუნდთან ერთად
          ეპიკური თავგადასავალებით სავსე მოგზაურობაში მიდის მულტისამყაროში,
        </p>{" "}
        <div className="flex items-center justify-between  mt-auto">
          <div className="flex gap-2 flex-wrap">
            <a
              href=""
              className="py-1.5 px-3 bg-white/5 cursor-pointer text-sm text-white/50 hover:bg-white/10 hover:text-main transition-colors"
            >
              კომედია
            </a>{" "}
            <a
              href=""
              className="py-1.5 px-3 bg-white/5 cursor-pointer text-sm text-white/50 hover:bg-white/10 hover:text-main transition-colors"
            >
              მელოდრამა
            </a>{" "}
          </div>
          <div className="flex items-center gap-2 ">
            <div
              onClick={(e) => HeartMovie(e)}
              className="h-[34px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <HeartIcon height={16} />
            </div>
            <div
              onClick={(e) => BookmarkMovie(e)}
              className="h-[34px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <BookmarkIcon height={16} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-start justify-between px-2.5 pr-1 pt-2.5  pb-2.5 group-hover/card:bg-[#ffffff]/10">
        <div className="flex flex-col gap-0.5 case_up uppercase tracking-wide">
          <p className="text-textHead font-robotoGeoCaps text-[16px]">
            ლილო და სტიჩი
          </p>
          <p className="text-textDesc text-[14px]">Lilo & Stitch (2025)</p>
        </div>
        <div className="h-[32px] aspect-square flex justify-center items-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.1)] cursor-pointer">
          <div className="flex flex-col gap-[3px] cursor-pointer">
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
          </div>
        </div>
      </div> */}
    </Link>
  );
}
