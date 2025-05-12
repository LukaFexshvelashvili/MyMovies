import { useEffect } from "react";
import useUser from "../store/useUser";
import { useNavigate } from "react-router";
import { api } from "../../api/axios";

export default function Logout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutRequest = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get("returnTo") || "/";

      try {
        await api.get(`/auth/logout`, {
          withCredentials: true,
        });

        setUser(null);

        navigate(-1);
      } catch (error) {
        console.error("Logout failed:", error);
        navigate(-1);
      }
    };

    logoutRequest();
  }, [navigate, setUser]);

  return null;
}
