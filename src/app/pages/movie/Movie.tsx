import {
  BookmarkIcon,
  HeartIcon,
  IMDbIcon,
  RatingStarClearIcon,
  WarningIcon,
} from "../../../assets/icons/MyIcons";
import MovieCard from "../../../components/MovieCard";
import MovieComments from "./components/MovieComments";
import SimilarMovies from "./components/SimilarMovies";

export default function Movie() {
  return (
    <main className="pb-20">
      <div className="h-[160px] w-full bg-[#0E0101] flex justify-center">
        <img src="/decorations/movieBanner.png" alt="" className="max-w-full" />
      </div>
      <section className="mt-6">
        <div className="my_container">
          <div className="w-full h-[590px] flex">
            <div className="h-full aspect-video bg-[rgb(36,36,36)]"></div>
            <div className="h-full w-full bg-[rgb(40,40,40)]"></div>
          </div>
          <div className="flex items-center gap-3 py-5">
            <div className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10">
              <HeartIcon height={16} />
            </div>
            <div className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10">
              <BookmarkIcon height={16} />
            </div>

            <div className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10">
              <WarningIcon height={16} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="my_container">
          <div className="flex items-start gap-8">
            <div className="w-[240px] flex flex-col shrink-0 gap-4">
              <div className="aspect-[2/3] w-full">
                <img
                  src="https://cdn.moviesgo.ge/uploads/227/pO10ICc.webp"
                  alt=""
                />
              </div>
              <div className="py-3.5 px-3 text-textDesc bg-[rgb(37,37,37)] flex flex-col gap-3 text-sm">
                <p>რეიტინგი</p>

                <div className="flex items-center gap-3 text-textHead font-mainSemiBold text-sm">
                  <IMDbIcon height={30} width={35} />
                  4.5
                  <span className="text-textDesc font-mainRegular tracking-wide">
                    (6421)
                  </span>
                </div>
                <p>მომხმარებლების რეიტინგი</p>

                <div className="flex gap-3 items-center">
                  <div className="flex gap-0.5">
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                  </div>
                  <p className="text-textHead font-mainSemiBold">2.7</p>
                  <span className="text-textDesc font-mainRegular tracking-wide">
                    (10)
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-3 tracking-wider">
                <h1 className="text-textHead text-[21px]">პადინგტონი პერუში</h1>
                <h2 className="text-white/60 uppercase text-[18pxl">
                  Paddington in Peru
                </h2>
              </div>
              <div className="flex gap-2 text-white/40 mt-2 text-[14px]">
                <div className="language">ქართულად</div>
                <div className="language">ინგლისურად</div>
                <div className="language">რუსულად</div>
              </div>
              <div className="mt-2 text-white/60 tracking-wider text-[15px] font-mainRegular leading-6">
                1999 წლის კლასიკური თინეიჯერული კომედიის “ეს სულ ისაა”
                თანამედროვე რიმეიკი, ლამაზმანი სკოლის მოსწავლის პეჯეტის შესახებ,
                რომელიც ინსტაგრამზე პირდაპირი ტრანსლაციის დროს თავის მეგობარ
                ბიჭს დაშორდება. ახლა მას სჭირდება არა მხოლოდ მისი შელახული
                თავმოყვარეობის კომპესირება, არამედ სკოლაში დაცემული სოციალური
                რეიტინგის გამოსწორება, და გამოსაშვებ ცერემონიაზე გამარჯვებულად
                წარდგენა. შედეგად, ახალგაზრდა გმირი სკოლაში ყველაზე
                არაპოპულარული და დავიწყებული ბიჭის სექსუალურ ლამაზ მამაკაცად
                ქცევას გადაწყვეტს. მისი არჩევანი კამერონზე შეჩერდება –
                არაკომუნიკაბელური ბოტანი, რომელსაც ყველა თავს არიდებს.
              </div>
              <div className="flex items-start gap-5 mt-5">
                <div className="flex flex-col gap-0.5 [&>p]:h-[30px] [&>p]:text-[15px] [&>p]:text-white/40 text-end">
                  <p>წელი:</p>
                  <p>ხანგრძლივობა:</p>
                  <p>ქვეყანა:</p>
                  <p>სტუდია:</p>
                  <p>ჟანრი:</p>
                  <p>რეჟისორი:</p>
                </div>
                <div className="flex flex-col gap-0.5 [&>p]:h-[30px] [&>p]:text-[14px] [&>p]:text-white/70 uppercase">
                  <p>2021</p>
                  <p>88 წუთი</p>
                  <p>აშშ</p>
                  <p>Miramax Films, Netflix</p>
                  <p>
                    <a
                      href=""
                      className="py-1.5 px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                    >
                      კომედია
                    </a>{" "}
                    <a
                      href=""
                      className="py-1.5 px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                    >
                      მელოდრამა
                    </a>{" "}
                  </p>
                  <p>Mark Waters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SimilarMovies />
      <MovieComments />
    </main>
  );
}
