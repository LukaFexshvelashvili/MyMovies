import { useEffect } from "react";
import useUser from "../store/useUser";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../../api/axios";
import { SuspenseLoader } from "../App";

export default function Logout() {
  const { setUser, user } = useUser();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!returnTo) {
      navigate("/");
      return;
    }
    if (user !== null) {
      const logoutRequest = async () => {
        try {
          await api.get(`/auth/logout`, {
            withCredentials: true,
          });

          setUser(null);

          navigate(returnTo, { replace: true });
        } catch (error) {
          console.error("Logout failed:", error);
          navigate(returnTo, { replace: true });
        }
      };

      logoutRequest();
    } else {
      navigate(returnTo, { replace: true });
    }
  }, [navigate, setUser, user]);

  return (
    <>
      <SuspenseLoader />
    </>
  );
}
