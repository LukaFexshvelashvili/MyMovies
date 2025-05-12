import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/ServerFunctions";
import useUser from "../app/store/useUser";
import { useEffect } from "react";
import { TUser } from "../app/types/UserTypes";

export default function UserDataControl() {
  const { setUser } = useUser();
  const { data, isLoading } = useQuery<{ status: number; data: TUser }>({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: Infinity,
  });
  useEffect(() => {
    if (data?.status == 200 && !isLoading) {
      setUser(data.data);
    }
  }, [data, setUser]);

  return <></>;
}
