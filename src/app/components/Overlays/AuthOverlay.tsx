import { useActionState, useEffect, useState } from "react";
import {
  CloseIcon,
  EyeBlindIcon,
  EyeIcon,
} from "../../../assets/icons/MyIcons";
import useOverlayStore from "../../store/useOverlay";
import { loginRequest, registerRequest } from "../../../api/ServerFunctions";
import useUser from "../../store/useUser";

export default function AuthOverlay() {
  const { authOverlay, setAuthOverlay } = useOverlayStore();
  const { user } = useUser();
  if (!authOverlay) return null;
  if (user) return null;
  return (
    <div className="fixed z-80  h-full w-full top-0 left-0 flex justify-center items-center">
      <div
        onClick={() => setAuthOverlay(false)}
        className="absolute top-0 left-0 h-full w-full z-0 bg-black/50"
      ></div>
      <AuthBlock close={() => setAuthOverlay(false)} />
    </div>
  );
}
function AuthBlock(props: { close: Function }) {
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");
  return (
    <div className="relative bg-bodyBg w-full max-w-[500px] pb-2">
      <div className="flex justify-end  px-2 py-1 ">
        <div className="p-1 cursor-pointer" onClick={() => props.close()}>
          <CloseIcon className="text-textDesc h-6" />
        </div>
      </div>
      <div className="flex h-[60px] items-stretch select-none">
        <div
          onClick={() => setActiveForm("login")}
          className={`flex-1 h-full  font-robotoGeoCaps flex justify-center items-center cursor-pointer ${
            activeForm == "login"
              ? "bg-secondColor text-textHead"
              : "text-textDesc hover:bg-white/5 hover:text-textHead"
          }`}
        >
          ავტორიზაცია
        </div>
        <div
          onClick={() => setActiveForm("register")}
          className={`flex-1 h-full  font-robotoGeoCaps flex justify-center items-center cursor-pointer ${
            activeForm == "register"
              ? "bg-secondColor text-textHead"
              : "text-textDesc hover:bg-white/5 hover:text-textHead"
          }`}
        >
          რეგისტრაცია
        </div>
      </div>
      {activeForm == "login" && (
        <LoginSection changeForm={() => setActiveForm("register")} />
      )}
      {activeForm == "register" && (
        <RegisterSection changeForm={() => setActiveForm("login")} />
      )}
    </div>
  );
}
function LoginSection(props: { changeForm: Function }) {
  const [data, action, isPending] = useActionState(loginRequest, null);
  const { setUser } = useUser();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data?.status == 200) {
      setUser(data.data);
    }
  }, [data]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-3  px-5 py-5">
        {data?.status == 200 ? (
          <div className="w-full py-3 flex justify-center items-center text-green-600 bg-green-600/10 border border-green-600">
            თქვენ წარმატებით შეხვედით სისტემაში
          </div>
        ) : (
          <>
            {data?.status == 0 ? (
              <div className="w-full py-3 flex justify-center items-center text-warning bg-warning/10 border border-warning">
                მომხმარებლის სახელი ან პროლი არასწორია
              </div>
            ) : null}
            <div className="flex flex-col gap-6">
              <InputBlock label="სახელი" name="username" />
              <InputBlock
                label="პაროლი"
                name="password"
                password
                show={show}
                setShow={setShow}
              />
            </div>
            <div className="flex gap-4 mt-5 justify-center">
              <button
                disabled={isPending}
                className="flex-1 h-[40px] min-w-[170px] text-textHead bg-main cursor-pointer hover:bg-mainHover"
              >
                {isPending ? "იტვირთება..." : "ავტორიზაცია"}
              </button>
              <button
                type="button"
                onClick={() => props.changeForm()}
                className="flex-1 h-[40px] min-w-[170px] text-textDesc cursor-pointer hover:bg-white/5"
              >
                რეგისტრაცია
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
function RegisterSection(props: { changeForm: Function }) {
  const [data, action, isPending] = useActionState(registerRequest, null);

  const [show, setShow] = useState(false);

  return (
    <form action={action}>
      <div className="flex flex-col gap-3  px-5 py-5">
        {data?.status == 3 ? (
          <div className="w-full py-3 flex justify-center items-center text-warning bg-warning/10 border border-warning">
            პაროლები არ ემთხვევა
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          <InputBlock label="სახელი" name="username" />
          <InputBlock label="ელ-ფოსტა" name="email" />
          <InputBlock
            label="პაროლი"
            name="password"
            password
            show={show}
            setShow={setShow}
          />
          <InputBlock
            label="გაიმეორეთ პაროლი"
            name="repeat_password"
            password
            show={show}
            setShow={setShow}
          />
        </div>
        <div className="flex gap-4 mt-5 justify-center">
          <button
            disabled={isPending}
            className="flex-1 h-[40px] min-w-[170px] text-textHead bg-main cursor-pointer hover:bg-mainHover"
          >
            {isPending ? "იტვირთება..." : "რეგისტრაცია"}
          </button>
          <button
            type="button"
            onClick={() => props.changeForm()}
            className="flex-1 h-[40px] min-w-[170px] text-textDesc cursor-pointer hover:bg-white/5"
          >
            ავტორიზაცია
          </button>
        </div>
      </div>
    </form>
  );
}
function InputBlock(props: {
  label: string;
  name: string;
  password?: boolean;
  show?: boolean;
  setShow?: Function;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={props.name} className="text-textDesc text-sm select-none">
        {props.label}
      </label>
      <div className="flex items-center">
        <input
          autoComplete="true"
          type={!props.password ? "text" : !props.show ? "password" : "text"}
          name={props.name}
          id={props.name}
          className="h-[46px] w-full border-1 border-white/15 focus:border-main"
        />
        {props.password && (
          <div
            onClick={() =>
              props.setShow && props.setShow((state: boolean) => !state)
            }
            className="absolute h-6 aspect-square right-8  cursor-pointer flex justify-center items-center select-none"
          >
            {props.show ? (
              <EyeIcon width="19" height="12" className="text-textDesc" />
            ) : (
              <EyeBlindIcon width="19" height="16" className="text-textDesc" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
