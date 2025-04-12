export default function MovieComments() {
  return (
    <section className="my-5">
      <div className="my_container">
        <div className="flex items-start gap-5">
          <div className="w-3/4">
            <p className="text-head text-md">3 კომენტარი</p>
            <form className="font-mainMedium">
              <div className="flex mt-5 gap-4">
                <div className="h-10 aspect-square rounded-[20px] bg-white/5"></div>
                <input
                  type="text"
                  name="comment"
                  className="w-full h-[40px] px-3 border-b-1 border-white/30 text-white/40 focus:text-white/90  transition-colors focus:border-main "
                />
              </div>
              <button className="px-4 py-1.5 text-textHead bg-main ml-auto block mt-5 tracking-wide case_up cursor-pointer hover:bg-mainHover transition-colors text-[15px]">
                გამოქვეყნება
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
