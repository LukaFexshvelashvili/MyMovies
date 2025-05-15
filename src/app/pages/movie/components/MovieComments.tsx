import { useQuery } from "@tanstack/react-query";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  add_comment,
  delete_comment,
  fetchComments,
} from "../../../../api/ServerFunctions";
import useUser from "../../../store/useUser";
import useAlerts from "../../../store/useAlerts";
import { SuspenseLoader } from "../../../App";
type TComment = {
  id: number;
  user_id: number;
  comment: string;
  create_date: string;
  nickname: string;
  replies: TComment[];
};
export default function MovieComments({
  isActive,
  movie_id,
}: {
  isActive: boolean;
  movie_id: number | string;
}) {
  const { user } = useUser();
  const { addAlert } = useAlerts();
  const { data: comments_data, refetch } = useQuery({
    queryKey: ["movie_comments", { movie_id }],
    queryFn: () => fetchComments({ movie_id }),
  });
  const [_, action, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const result = await add_comment(previousState, formData);
      addAlert({
        title: "კომენტარი დამატებულია",
      });
      await refetch();
      return result;
    },
    null
  );

  return (
    <section className={`${isActive ? "block" : "hidden mobile:block"} my-5`}>
      <div className="my_container">
        <div className="flex items-start gap-5">
          <div className="mobile:w-3/4 w-full">
            <p className="text-head text-md">
              {comments_data?.comments.length} კომენტარი
            </p>
            <form action={action} className="font-mainMedium">
              <div className="flex mt-5 gap-4">
                <div className="h-10 aspect-square rounded-[20px] bg-white/5"></div>
                <input
                  type="hidden"
                  name="user_id"
                  value={user?.id ? user.id : -1}
                />
                <input type="hidden" name="movie_id" value={movie_id} />
                <input
                  type="text"
                  name="comment_input"
                  className="w-full h-[40px] px-3 border-b-1 border-white/30 text-white/40 focus:text-white/90  transition-colors focus:border-main "
                />
              </div>
              <button
                disabled={isPending}
                className={`px-4 py-1.5 text-textDescLight2 bg-white/5 ml-auto block mt-5 tracking-wide case_up cursor-pointer hover:bg-white/10 ${
                  isPending ? "cursor-default" : ""
                } transition-colors text-[14px]`}
              >
                {isPending ? " ქვეყნდება... " : "გამოქვეყნება"}
              </button>
            </form>

            <div className="flex flex-col gap-6 mt-10">
              {comments_data?.comments.map((comment: TComment) => (
                <Comment
                  user_id={user?.id ? user.id : -1}
                  add_alert={addAlert}
                  movie_id={movie_id}
                  comment={comment}
                  refetch={refetch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function get_local_time($timestamp){
//   $georgian_weekdays = [
//       'Monday' => 'ორშ',
//       'Tuesday' => 'სამ',
//       'Wednesday' => 'ოთხ',
//       'Thursday' => 'ხუთ',
//       'Friday' => 'პარ',
//       'Saturday' => 'შაბ',
//       'Sunday' => 'კვი'
//   ];

function Comment({
  add_alert,
  user_id,
  movie_id,
  comment,
  refetch,
}: {
  add_alert: Function;
  user_id: number;
  movie_id: string | number;
  comment: TComment;
  refetch: Function;
}) {
  const [replyBlock, setReplyBlock] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [_, action, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const result = await add_comment(previousState, formData);
      add_alert({
        title: "კომენტარი დამატებულია",
      });
      await refetch();
      setReplyBlock(false);
      return result;
    },
    null
  );

  useEffect(() => {
    if (replyBlock && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyBlock]);

  return (
    <>
      <div className="flex w-full gap-3 relative">
        {loading ? (
          <>
            <div className="absolute top-0 left-0 h-full w-full bg-black/20 z-10">
              <SuspenseLoader />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="">
          <div className="h-9 aspect-square rounded-[20px] bg-white/5"></div>
        </div>
        <div className="flex flex-1 flex-col py-1.5 items-start">
          <div className="flex-1 flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <p className="text-textDesc">{comment.nickname}</p>
            </div>
            <p className="text-textDescDark">გუშინ</p>
          </div>
          <p className="text-textHead mt-2">{comment.comment}</p>

          <div className="flex gap-3">
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
            {user_id == comment.user_id ? (
              <div
                onClick={() => {
                  setLoading(true);
                  delete_comment(comment.id, user_id)
                    .then(async () => {
                      await refetch();
                      add_alert({
                        title: "კომენტარი წაიშალა",
                      });
                      setLoading(false);
                    })
                    .catch(() => {
                      setLoading(true);
                    });
                }}
                className="inline-flex text-textDesc mt-2 cursor-pointer hover:text-main"
              >
                წაშლა
              </div>
            ) : null}
          </div>

          {replyBlock && (
            <div className="flex w-full gap-3 mt-3">
              <div className="h-9 aspect-square rounded-[20px] bg-white/5"></div>

              <form action={action} className="font-mainMedium flex-1">
                <div className="flex mt-0 gap-4">
                  <input
                    type="hidden"
                    name="user_id"
                    value={user_id ? user_id : -1}
                  />
                  <input type="hidden" name="movie_id" value={movie_id} />
                  <input type="hidden" name="reply_id" value={comment.id} />
                  <input
                    type="text"
                    name="comment_input"
                    placeholder="კომენტარი"
                    ref={inputRef}
                    className="w-full h-[40px] px-3 border-b-1 border-white/30 text-white/40 focus:text-white/90  transition-colors focus:border-main "
                  />
                </div>
                <button
                  disabled={isPending}
                  className={`px-4 py-1.5 text-textDescLight2 bg-white/5 ml-auto block mt-5 tracking-wide case_up cursor-pointer hover:bg-white/10 ${
                    isPending ? "cursor-default" : ""
                  } transition-colors text-[14px]`}
                >
                  {isPending ? " ქვეყნდება... " : "პასუხი"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[calc(100%-50px)] ml-auto border-l-2 border-white/5 pl-5">
        {comment.replies?.map((reply: TComment) => (
          <Comment
            user_id={user_id ? user_id : -1}
            add_alert={add_alert}
            movie_id={movie_id}
            comment={reply}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
}
