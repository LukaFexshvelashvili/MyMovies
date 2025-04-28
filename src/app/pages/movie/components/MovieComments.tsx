import { useEffect, useRef, useState } from "react";

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
              <button className="px-4 py-1.5 text-textDescLight2 bg-white/5 ml-auto block mt-5 tracking-wide case_up cursor-pointer hover:bg-white/10 transition-colors text-[14px]">
                გამოქვეყნება
              </button>
            </form>

            <CommentsRow />
          </div>
        </div>
      </div>
    </section>
  );
}
function CommentsRow() {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

function Comment() {
  const [replyBlock, setReplyBlock] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (replyBlock && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyBlock]);
  return (
    <div className="flex w-full gap-3">
      <div className="">
        <div className="h-9 aspect-square rounded-[20px] bg-white/5"></div>
      </div>
      <div className="flex flex-1 flex-col py-1.5 items-start">
        <div className="flex-1 flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <p className="text-textDesc">ლუკა ფეხშველაშვილი</p>
          </div>
          <p className="text-textDescDark">გუშინ</p>
        </div>
        <p className="text-textHead mt-2">ძალიან მაგარი იყო</p>

        <div
          onClick={() => {
            setReplyBlock(true);
            if (replyBlock && inputRef.current) {
              inputRef.current.focus();
            }
          }}
          className="inline-flex text-textDesc mt-2 cursor-pointer hover:text-main"
        >
          უპასუხე
        </div>
        {replyBlock && (
          <div className="flex w-full gap-3 mt-3">
            <div className="h-9 aspect-square rounded-[20px] bg-white/5"></div>

            <form className="font-mainMedium flex-1">
              <div className="flex mt-0 gap-4">
                <input
                  type="text"
                  name="reply"
                  placeholder="კომენტარი"
                  ref={inputRef}
                  className="w-full h-[40px] px-3 border-b-1 border-white/30 text-white/40 focus:text-white/90  transition-colors focus:border-main "
                />
              </div>
              <button className="px-4 py-1.5 text-textDescLight2 bg-white/5 ml-auto block mt-5 tracking-wide case_up cursor-pointer hover:bg-white/10 transition-colors text-[14px]">
                გამოქვეყნება
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
